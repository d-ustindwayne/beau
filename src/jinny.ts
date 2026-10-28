import productList from "./productList.json";
import orderList from "./orderList.json";
import { Cart } from "./cartData.tsx";
import { dollarFormatter, formatCategory } from "./constants";
import type { ProductList } from "./types";

/* ---------- Types ---------- */

export interface ToolCall {
    id: string,
    type: "function",
    function: { name: string, arguments: string }
}

export interface CatalogProduct {
    name: string,
    collection: string,
    finish: string,
    price: number,
    photoUrl: string,
    description: string
}

export type JinnyMessage =
    | { role: "user", content: string }
    | { role: "assistant", content: string | null, tool_calls?: ToolCall[], products?: CatalogProduct[], isError?: boolean }
    | { role: "tool", tool_call_id: string, content: string };

export type NavigateFn = (path: string) => void;

export const JINNY_API_URL: string | undefined = import.meta.env.VITE_JINNY_API_URL || undefined;

const OPEN_EVENT = "jinny:open";

/** Opens the Jinny chat panel from anywhere on the site, optionally sending a first message. */
export function openJinny(message?: string): void {
    window.dispatchEvent(new CustomEvent<string | undefined>(OPEN_EVENT, { detail: message }));
}

export function onJinnyOpen(handler: (message?: string) => void): () => void {
    const listener = (e: Event) => handler((e as CustomEvent<string | undefined>).detail);
    window.addEventListener(OPEN_EVENT, listener);
    return () => window.removeEventListener(OPEN_EVENT, listener);
}

const PAGE_PATHS: Record<string, string> = {
    home: "/", shop: "/shop", about: "/about", contact: "/contact", affiliate: "/affiliate", affiliate_apply: "/affiliate/apply", checkout: "/checkout",
    collections: "/collections", sale: "/sale", shade_finder: "/shade-finder", customer_service: "/customer-service", order_status: "/order-status", store_locator: "/store-locator",
    refund_policy: "/refund-policy", privacy_policy: "/privacy-policy", terms: "/terms-and-conditions",
};

/* ---------- Catalogue ---------- */

export const catalog: CatalogProduct[] = Object.entries(productList as ProductList).flatMap(([collection, products]) =>
    products.map((p) => ({
        name: p.name, collection, finish: p.lipstickType, price: p.price, photoUrl: p.photoUrl, description: p.description,
    }))
);

const normalise = (s: string) => s.toLowerCase().replace(/[_\s]+/g, " ").trim();

function findProduct(name: string, collection?: string): CatalogProduct[] {
    const target = normalise(name);
    return catalog.filter((p) =>
        normalise(p.name) === target && (!collection || normalise(p.collection) === normalise(collection))
    );
}

interface SearchArgs {
    query?: string, collection?: string, finish?: string, min_price?: number, max_price?: number, limit?: number
}

export function searchProducts({ query, collection, finish, min_price, max_price, limit = 6 }: SearchArgs): CatalogProduct[] {
    const words = query ? normalise(query).split(" ").filter((w) => w.length > 1) : [];
    const scored = catalog
        .filter((p) =>
            (!collection || normalise(p.collection) === normalise(collection)) &&
            (!finish || p.finish.toLowerCase() === finish.toLowerCase()) &&
            (min_price === undefined || p.price >= min_price) &&
            (max_price === undefined || p.price <= max_price))
        .map((p) => {
            if (words.length === 0) return { p, score: 1 };
            const name = normalise(p.name), coll = normalise(p.collection), desc = normalise(p.description);
            const score = words.reduce((sum, w) =>
                sum + (name.includes(w) ? 5 : 0) + (coll.includes(w) ? 3 : 0) + (p.finish.toLowerCase() === w ? 3 : 0) + (desc.includes(w) ? 1 : 0), 0);
            return { p, score };
        })
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score);
    return scored.slice(0, Math.min(Math.max(limit, 1), 8)).map(({ p }) => p);
}

/** The first paragraph of a description says what colour the shade actually is. */
const shadeOf = (p: CatalogProduct) => p.description.split("\n")[0];

const summarise = (p: CatalogProduct) => ({ name: p.name, collection: formatCategory(p.collection), finish: p.finish, price: dollarFormatter(p.price), shade: shadeOf(p) });

/* ---------- Tool execution (runs in the browser) ---------- */

interface ToolResult {
    content: string,
    products?: CatalogProduct[]
}

export async function executeTool(call: ToolCall, navigate: NavigateFn): Promise<ToolResult> {
    let args: Record<string, unknown>;
    try {
        args = JSON.parse(call.function.arguments || "{}") ?? {};
    } catch {
        return { content: JSON.stringify({ error: "Invalid arguments" }) };
    }
    const str = (v: unknown) => (typeof v === "string" && v.trim() ? v : undefined);
    const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

    switch (call.function.name) {
        case "search_products": {
            const products = searchProducts({
                query: str(args.query), collection: str(args.collection), finish: str(args.finish),
                min_price: num(args.min_price), max_price: num(args.max_price), limit: num(args.limit),
            });
            return { content: JSON.stringify({ count: products.length, products: products.map(summarise) }), products };
        }
        case "get_product_details": {
            const matches = findProduct(str(args.product_name) ?? "", str(args.collection));
            if (matches.length === 0) return { content: JSON.stringify({ error: "Product not found" }) };
            if (matches.length > 1) return { content: JSON.stringify({ error: "Ambiguous product", options: matches.map(summarise) }) };
            const p = matches[0];
            return { content: JSON.stringify({ ...summarise(p), description: p.description }), products: [p] };
        }
        case "add_to_cart": {
            const matches = findProduct(str(args.product_name) ?? "", str(args.collection));
            if (matches.length === 0) return { content: JSON.stringify({ error: "Product not found. Search first to get the exact name." }) };
            if (matches.length > 1) return { content: JSON.stringify({ error: "Ambiguous product", options: matches.map(summarise) }) };
            const p = matches[0];
            const quantity = Math.min(Math.max(Math.round(num(args.quantity) ?? 1), 1), 20);
            await Cart.add(p.collection, { name: p.name, price: p.price, lipstickType: p.finish, description: p.description, photoUrl: p.photoUrl }, quantity);
            return { content: JSON.stringify({ added: quantity, product: summarise(p), cart_items: Cart.getCount(Cart.CartList) }), products: [p] };
        }
        case "get_cart": {
            const cart = Cart.CartList;
            return {
                content: JSON.stringify({
                    items: cart.map((i) => ({ name: i.product.name, collection: formatCategory(i.category), quantity: i.amount, line_total: dollarFormatter(i.product.price * i.amount) })),
                    item_count: Cart.getCount(cart),
                    subtotal_incl_gst: dollarFormatter(Cart.getSubtotal(cart)),
                }),
            };
        }
        case "get_order_status": {
            const number = (str(args.order_number) ?? "").trim().toUpperCase().replace(/^#/, "");
            const email = (str(args.email) ?? "").trim().toLowerCase();
            const order = orderList.find((o) => o.number === number && o.email.toLowerCase() === email);
            if (!order) return { content: JSON.stringify({ error: "No order found with that number and email." }) };
            const latest = order.history[order.history.length - 1];
            return {
                content: JSON.stringify({
                    number: order.number, status: latest.status, updated: latest.at, estimated_delivery: order.estimatedDelivery,
                    deliver_to: order.deliverTo, courier: order.courier, tracking: order.tracking,
                    items: order.items.map((i) => ({ name: i.name, collection: formatCategory(i.collection), quantity: i.quantity })),
                }),
            };
        }
        case "navigate": {
            const page = str(args.page) ?? "";
            const path = PAGE_PATHS[page];
            if (!path) return { content: JSON.stringify({ error: "Unknown page" }) };
            const finish = str(args.finish);
            const collection = str(args.collection);
            const params = new URLSearchParams();
            if (page === "shop" && collection) params.set("collections", collection.toLowerCase().replace(/_/g, "-"));
            if (page === "shop" && finish) params.set("finish", finish.toLowerCase());
            navigate(params.size ? `${path}?${params}` : path);
            return { content: JSON.stringify({ navigated_to: page, finish: finish ?? null, collection: collection ?? null }) };
        }
        default:
            return { content: JSON.stringify({ error: "Unknown tool" }) };
    }
}

/* ---------- Conversation loop ---------- */

const MAX_TOOL_ROUNDS = 4;
const HISTORY_LIMIT = 24;

/** Strips UI-only fields and trims history so it always starts at a user message. */
function toApiMessages(messages: JinnyMessage[]): JinnyMessage[] {
    const clean = messages
        .filter((m) => !(m.role === "assistant" && m.isError))
        .map((m) => m.role === "assistant"
            ? (m.tool_calls?.length ? { role: m.role, content: m.content, tool_calls: m.tool_calls } : { role: m.role, content: m.content ?? "" })
            : m);
    let start = Math.max(0, clean.length - HISTORY_LIMIT);
    while (start < clean.length && clean[start].role !== "user") start++;
    return clean.slice(start) as JinnyMessage[];
}

/** Retries once after a short pause, since free AI tiers occasionally fail a single request under load. */
async function requestReply(messages: JinnyMessage[], signal?: AbortSignal): Promise<{ content: string | null, tool_calls?: ToolCall[] }> {
    try {
        return await requestReplyOnce(messages, signal);
    } catch (error) {
        if (signal?.aborted) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return requestReplyOnce(messages, signal);
    }
}

async function requestReplyOnce(messages: JinnyMessage[], signal?: AbortSignal): Promise<{ content: string | null, tool_calls?: ToolCall[] }> {
    const res = await fetch(JINNY_API_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: toApiMessages(messages) }),
        signal,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.message) throw new Error(data.error || "Jinny couldn't respond right now.");
    return data.message;
}

/**
 * Sends the conversation to Jinny, runs any tools she asks for, and returns the new
 * messages produced this turn (assistant + tool messages). Falls back to offline
 * answers when no API endpoint is configured.
 */
export async function askJinny(history: JinnyMessage[], navigate: NavigateFn, signal?: AbortSignal): Promise<JinnyMessage[]> {
    if (!JINNY_API_URL) return [await offlineReply(history, navigate)];

    const turn: JinnyMessage[] = [];
    try {
        return await askOnline(history, turn, navigate, signal);
    } catch (error) {
        // If the AI service is down or not configured, answer from the local catalogue instead of failing,
        // unless a tool already ran this turn (re-running it offline could, for example, add an item twice).
        if (signal?.aborted || turn.some((m) => m.role === "tool")) throw error;
        return [await offlineReply(history, navigate)];
    }
}

async function askOnline(history: JinnyMessage[], turn: JinnyMessage[], navigate: NavigateFn, signal?: AbortSignal): Promise<JinnyMessage[]> {
    const shownProducts: CatalogProduct[] = [];

    for (let round = 0; round <= MAX_TOOL_ROUNDS; round++) {
        const reply = await requestReply([...history, ...turn], signal);
        const toolCalls = round < MAX_TOOL_ROUNDS ? reply.tool_calls : undefined;

        if (!toolCalls?.length) {
            const unique = shownProducts.filter((p, i, arr) => arr.findIndex((q) => q.name === p.name && q.collection === p.collection) === i);
            turn.push({ role: "assistant", content: reply.content ?? "", products: unique.length ? unique : undefined });
            return turn;
        }

        turn.push({ role: "assistant", content: reply.content, tool_calls: toolCalls });
        for (const call of toolCalls) {
            const result = await executeTool(call, navigate);
            if (result.products) shownProducts.push(...result.products);
            turn.push({ role: "tool", tool_call_id: call.id, content: result.content });
        }
    }
    return turn;
}

/* ---------- Offline fallback (no API configured) ---------- */

async function offlineReply(history: JinnyMessage[], navigate: NavigateFn): Promise<JinnyMessage> {
    const last = [...history].reverse().find((m) => m.role === "user");
    const text = last?.role === "user" ? last.content.toLowerCase() : "";
    const reply = (content: string, products?: CatalogProduct[]): JinnyMessage => ({ role: "assistant", content, products });

    const addMatch = text.match(/\badd\s+(\d+\s+)?(.+?)(\s+to\s+(my\s+)?(cart|bag))?$/);
    if (addMatch) {
        const quantity = addMatch[1] ? parseInt(addMatch[1]) : 1;
        const product = catalog.find((p) => addMatch[2].includes(p.name.toLowerCase()));
        if (product) {
            await executeTool({ id: "offline", type: "function", function: { name: "add_to_cart", arguments: JSON.stringify({ product_name: product.name, collection: product.collection, quantity }) } }, navigate);
            return reply(`Done! I've added ${quantity} × **${product.name}** to your cart.`, [product]);
        }
    }

    const page = Object.keys(PAGE_PATHS).find((p) => new RegExp(`\\b(go to|open|take me to|show me) (the )?${p.replace(/_/g, " ")}\\b`).test(text));
    if (page) {
        navigate(PAGE_PATHS[page]);
        return reply(`Taking you to the ${page.replace(/_/g, " ")} page now.`);
    }

    if (/deliver|shipping|ship/.test(text)) return reply("Delivery is **free** on every order.");
    if (/gst|tax/.test(text)) return reply("All our prices are in NZD and already include 15% GST.");
    if (/contact|email|support|address/.test(text)) return reply("You can reach us at **beau@example.com**, or through the Contact page. Our support team is here 24/7.");
    if (/affiliate|partner|commission/.test(text)) return reply("Our affiliate collective lets you **Join**, **Advertise** with our brand imagery, and **Earn** commission on every purchase you drive. Apply through the form on our Affiliate page.");

    const finish = ["matte", "satin", "glossy"].find((f) => text.includes(f));
    const priceMatch = text.match(/(under|below|less than|max)\s*\$?(\d+)/);
    const collection = catalog.find((p) => text.includes(normalise(p.collection)))?.collection;
    const products = searchProducts({
        query: finish || priceMatch || collection ? undefined : text,
        finish, collection,
        max_price: priceMatch ? Number(priceMatch[2]) : undefined,
    });
    if (products.length) return reply("Here are a few shades you might love:", products);

    return reply("I'm in offline mode right now, but I can still help you find shades by name, collection, finish or price. Try \"matte under $55\", or ask me about delivery or our affiliate programme.");
}
