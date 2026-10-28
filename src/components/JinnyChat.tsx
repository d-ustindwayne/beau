import { Fragment, useEffect, useRef, useState, type FormEvent, type JSX, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { askJinny, JINNY_API_URL, onJinnyOpen, productKey, type CatalogProduct, type JinnyMessage } from "../jinny";
import { Cart } from "../cartData.tsx";
import { dollarFormatter, formatCategory } from "../constants";
import { useDialog } from "../hooks";
import LazyImage from "./LazyImage";
import { brandify } from "../brand";

const STORAGE_KEY = "jinny_chat";
// Drop an avatar at public/assets/brand/jinny.webp to replace the "J" monogram.
const AVATAR_URL = `${import.meta.env.BASE_URL}assets/brand/jinny.webp`;
const MAX_INPUT = 1000;

const GREETING: JinnyMessage = {
    role: "assistant",
    content: "Hi, I'm **Jinny**, be•au's beauty assistant. Tell me the occasion or what you're wearing and I'll suggest a shade. I can also add it to your cart, track an order, or answer questions about delivery and returns.",
};

const SUGGESTIONS = [
    "Show me matte shades",
    "Lipsticks under $55",
    "What's in Sun Goddess?",
    "Something for date night",
];

function loadHistory(): JinnyMessage[] {
    try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        const parsed = saved ? JSON.parse(saved) : null;
        return Array.isArray(parsed) && parsed.length ? parsed : [GREETING];
    } catch {
        return [GREETING];
    }
}

/** Renders **bold**, line breaks and "- " bullet lists without injecting HTML. */
function RichText({ text }: { text: string }): JSX.Element {
    const inline = (line: string): ReactNode[] =>
        line.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
            part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{brandify(part.slice(2, -2))}</strong> : <Fragment key={i}>{brandify(part)}</Fragment>);

    const blocks: JSX.Element[] = [];
    let bullets: string[] = [];
    const flush = () => {
        if (!bullets.length) return;
        blocks.push(<ul key={`ul-${blocks.length}`} className="list-disc ps-5 space-y-0.5">{bullets.map((b, i) => <li key={i}>{inline(b)}</li>)}</ul>);
        bullets = [];
    };
    text.split("\n").forEach((line) => {
        const bullet = line.match(/^\s*[-*•]\s+(.*)/) ?? line.match(/^\s*\d+\.\s+(.*)/);
        if (bullet) { bullets.push(bullet[1]); return; }
        flush();
        if (line.trim()) blocks.push(<p key={`p-${blocks.length}`}>{inline(line)}</p>);
    });
    flush();
    return <div className="space-y-1.5">{blocks}</div>;
}

/** Jinny's portrait, falling back to a monogram until an avatar image is added. */
function JinnyAvatar({ className, monogramClassName }: { className: string, monogramClassName: string }): JSX.Element {
    const [hasImage, setHasImage] = useState(true);
    return (
        <span aria-hidden="true" className={`flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-beau text-sand font-serif italic ${className}`}>
            {hasImage
                ? <img src={AVATAR_URL} alt="" className="size-full object-cover" onError={() => setHasImage(false)} />
                : <span className={monogramClassName}>J</span>}
        </span>
    );
}

/** `inCart` marks a product Jinny just added, so the card confirms it instead of offering to add it again. */
function ProductChip({ product, inCart }: { product: CatalogProduct, inCart?: boolean }): JSX.Element {
    const [added, setAdded] = useState(false);
    const category = formatCategory(product.collection);

    const add = async () => {
        await Cart.add(product.collection, { name: product.name, price: product.price, lipstickType: product.finish, description: product.description, photoUrl: product.photoUrl });
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <li className="w-36 shrink-0 snap-start flex flex-col bg-white border border-black/10 text-center">
            <div className="bg-white flex justify-center pt-2">
                <LazyImage src={product.photoUrl} alt={`${product.name} lipstick from ${category}`} width={96} height={128} className="w-24 aspect-3/4 object-cover" />
            </div>
            <div className="px-2 pt-1 pb-2 flex flex-col flex-1">
                <p className="font-sans font-light text-lg leading-tight truncate">{product.name}</p>
                <p className="font-serif font-bold text-sm leading-tight truncate">{category}</p>
                <p className="font-sans text-sm mb-2">{dollarFormatter(product.price)} · <span className="text-neutral-600">{product.finish}</span></p>
                {inCart ? (
                    <p className="mt-auto w-full border border-beau text-beau text-xs font-semibold uppercase tracking-wide py-1.5">In your cart</p>
                ) : (
                    <button type="button" onClick={add} disabled={added} aria-label={`Add ${product.name} to cart`}
                        className="mt-auto w-full bg-beau text-white text-xs font-semibold uppercase tracking-wide py-1.5 transition-colors hover:bg-beau-dark disabled:opacity-80">
                        {added ? "Added" : "Add to cart"}
                    </button>
                )}
            </div>
        </li>
    );
}

export default function JinnyChat(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [messages, setMessages] = useState<JinnyMessage[]>(loadHistory);
    const [input, setInput] = useState("");
    const [isThinking, setIsThinking] = useState(false);
    const panelRef = useRef<HTMLElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const logRef = useRef<HTMLDivElement>(null);
    const abortRef = useRef<AbortController | null>(null);
    const isVisible = isOpen && !isClosing;

    const handleClose = () => {
        if (!isOpen || isClosing) return;
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 300);
    };

    useDialog(isVisible, panelRef, handleClose, ["Escape"], inputRef);

    useEffect(() => {
        try {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        } catch {
            // Storage can be unavailable (private mode); the chat still works in memory.
        }
    }, [messages]);

    useEffect(() => {
        const log = logRef.current;
        if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
    }, [messages, isThinking, isVisible]);

    useEffect(() => () => abortRef.current?.abort(), []);

    // Moving to another page (a link, the back button, or Jinny navigating) closes the chat so the page is visible.
    const lastLocationKey = useRef(location.key);
    useEffect(() => {
        if (lastLocationKey.current === location.key) return;
        lastLocationKey.current = location.key;
        setIsOpen(false);
        setIsClosing(false);
    }, [location.key]);

    // Other pages (e.g. Customer Service) can open the chat, optionally with a question ready to send.
    useEffect(() => onJinnyOpen((message) => {
        setIsOpen(true);
        if (message) setInput(message);
    }), []);

    const send = async (text: string) => {
        const content = text.trim().slice(0, MAX_INPUT);
        if (!content || isThinking) return;

        const history: JinnyMessage[] = [...messages, { role: "user", content }];
        setMessages(history);
        setInput("");
        setIsThinking(true);

        const controller = new AbortController();
        abortRef.current = controller;
        try {
            const turn = await askJinny(history, (path) => navigate(path), controller.signal);
            setMessages((current) => [...current, ...turn]);
        } catch (error) {
            if (controller.signal.aborted) return;
            const message = error instanceof Error && error.message ? error.message : "Jinny couldn't respond right now.";
            setMessages((current) => [...current, { role: "assistant", content: `${message} Please try again.`, isError: true }]);
        } finally {
            if (abortRef.current === controller) abortRef.current = null;
            setIsThinking(false);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        send(input);
    };

    const clearChat = () => {
        abortRef.current?.abort();
        setIsThinking(false);
        setMessages([GREETING]);
        inputRef.current?.focus();
    };

    const visibleMessages = messages.filter((m) => m.role === "user" || (m.role === "assistant" && (m.content || m.products?.length)));
    const showSuggestions = !isThinking && messages.every((m) => m.role !== "user");

    return (
        <>
            <button type="button" onClick={() => setIsOpen(true)}
                aria-label="Chat with Jinny, your beauty assistant"
                aria-haspopup="dialog"
                aria-expanded={isVisible}
                className={`group fixed bottom-5 right-5 z-40 flex items-center justify-center size-14 rounded-full bg-beau text-white shadow-lg ring-2 ring-sand/70 hover:bg-beau-dark hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${
                    isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}>
                <svg aria-hidden="true" className="size-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M21 12a8.5 8.5 0 0 1-12.4 7.55L3 21l1.45-5.6A8.5 8.5 0 1 1 21 12z" />
                </svg>
                <JinnyAvatar className="absolute -top-1 -right-1 size-5 ring-2 ring-sand" monogramClassName="text-[10px] font-bold" />
                <span aria-hidden="true" className="pointer-events-none absolute right-full me-3 whitespace-nowrap rounded-full bg-white px-3 py-1 text-sm text-black shadow-md opacity-0 translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 max-sm:hidden">
                    Ask Jinny
                </span>
            </button>

            <div onClick={handleClose} aria-hidden="true"
                className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
                    isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`} />

            <aside ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="jinny-title" inert={!isVisible}
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                }`}>
                <div className="flex items-center gap-3 px-6 py-4 border-b border-black/10">
                    <JinnyAvatar className="size-11" monogramClassName="text-2xl" />
                    <div className="flex-1 min-w-0">
                        <h2 id="jinny-title" className="font-serif italic text-3xl leading-none text-black">Jinny</h2>
                        <p className="text-xs text-neutral-600 mt-1 flex items-center gap-1.5">
                            <span aria-hidden="true" className={`size-2 rounded-full ${JINNY_API_URL ? "bg-emerald-600" : "bg-neutral-400"}`} />
                            {JINNY_API_URL ? "beau beauty assistant" : "beau beauty assistant · offline mode"}
                        </p>
                    </div>
                    <button type="button" onClick={clearChat} aria-label="Start a new conversation" title="New conversation"
                        className="p-2 rounded-full text-black hover:bg-sand transition-colors duration-200">
                        <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h5M20 20v-5h-5M5.6 15A7 7 0 0 0 18.4 16M18.4 9A7 7 0 0 0 5.6 8" />
                        </svg>
                    </button>
                    <button type="button" onClick={handleClose} aria-label="Close chat"
                        className="p-2 rounded-full text-black hover:bg-sand transition-colors duration-200">
                        <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div ref={logRef} role="log" aria-live="polite" aria-relevant="additions" className="flex-1 overflow-y-auto bg-cream px-4 py-5 space-y-4">
                    {visibleMessages.map((m, i) => m.role === "user"
                        ? (
                            <div key={i} className="flex justify-end animate-pop-in">
                                <p className="max-w-[85%] bg-beau text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">{m.content}</p>
                            </div>
                        ) : (
                            <div key={i} className="flex flex-col items-start gap-2 animate-pop-in">
                                {m.role === "assistant" && m.content ? (
                                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm leading-relaxed wrap-break-word border ${
                                        m.isError ? "bg-white border-beau/40 text-beau" : "bg-white border-black/10 text-black"
                                    }`}>
                                        <span className="sr-only">Jinny: </span>
                                        <RichText text={m.content} />
                                    </div>
                                ) : null}
                                {m.role === "assistant" && m.products?.length ? (
                                    <ul aria-label="Suggested products" className="flex gap-2.5 w-full overflow-x-auto snap-x pb-2">
                                        {m.products.map((p) => <ProductChip key={productKey(p)} product={p} inCart={m.inCart?.includes(productKey(p))} />)}
                                    </ul>
                                ) : null}
                            </div>
                        ))}

                    {isThinking && (
                        <div role="status" className="flex items-center gap-1.5 w-fit bg-white border border-black/10 px-4 py-3.5 rounded-2xl rounded-bl-sm">
                            <span className="sr-only">Jinny is typing…</span>
                            <span aria-hidden="true" className="size-2 rounded-full bg-beau animate-typing motion-reduce:animate-none" />
                            <span aria-hidden="true" className="size-2 rounded-full bg-beau animate-typing motion-reduce:animate-none [animation-delay:0.15s]" />
                            <span aria-hidden="true" className="size-2 rounded-full bg-beau animate-typing motion-reduce:animate-none [animation-delay:0.3s]" />
                        </div>
                    )}

                    {showSuggestions && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {SUGGESTIONS.map((s) => (
                                <button key={s} type="button" onClick={() => send(s)}
                                    className="px-3 py-1.5 rounded-full border border-beau/40 bg-white text-beau text-sm transition-colors hover:bg-beau hover:text-white">
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="flex items-end gap-2 px-4 py-3 border-t border-black/10 bg-white">
                    <label htmlFor="jinny-input" className="sr-only">Message Jinny</label>
                    <textarea id="jinny-input" ref={inputRef} rows={1} value={input} maxLength={MAX_INPUT}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                                e.preventDefault();
                                send(input);
                            }
                        }}
                        placeholder="Ask Jinny about shades, orders…"
                        className="flex-1 resize-none max-h-32 field-sizing-content border-2 border-beau bg-field px-3 py-2 text-sm text-black outline-0 transition-shadow focus:shadow-[0_0_0_3px_rgb(132_25_16/0.18)] placeholder:text-neutral-500" />
                    <button type="submit" disabled={!input.trim() || isThinking} aria-label="Send message"
                        className="flex items-center justify-center size-10.5 shrink-0 bg-beau text-white transition-colors hover:bg-beau-dark disabled:opacity-50 disabled:cursor-not-allowed">
                        <svg aria-hidden="true" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                    </button>
                </form>
                <p className="px-4 pb-3 bg-white text-[11px] text-neutral-500 text-center">Jinny is an AI assistant and can make mistakes.</p>
            </aside>
        </>
    );
}
