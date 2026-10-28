import { useState, type FormEvent, type JSX } from "react";
import { Link } from "react-router-dom";
import HeroHeading from "../components/HeroHeading";
import FloatingInput from "../components/FloatingInput";
import LazyImage from "../components/LazyImage";
import heroUrl from "/assets/hero/default-hero.webp";
import orderList from "../orderList.json";
import productList from "../productList.json";
import type { ProductList } from "../types";
import { ButtonDesign, dollarFormatter, formatCategory } from "../constants";

type OrderStage = "placed" | "packed" | "shipped" | "out_for_delivery" | "delivered";

interface Order {
    number: string,
    email: string,
    courier: string,
    tracking: string | null,
    deliverTo: string,
    estimatedDelivery: string,
    items: Array<{ collection: string, name: string, quantity: number }>,
    history: Array<{ status: string, at: string }>,
}

const orders = orderList as Order[];
const catalogue = productList as ProductList;

const STAGES: Array<{ key: OrderStage, title: string, text: string }> = [
    { key: "placed", title: "Order placed", text: "We've received your order." },
    { key: "packed", title: "Packed", text: "Wrapped with care at our Manukau studio." },
    { key: "shipped", title: "Shipped", text: "Handed to our courier partner." },
    { key: "out_for_delivery", title: "Out for delivery", text: "Arriving today." },
    { key: "delivered", title: "Delivered", text: "Enjoy your new shade." },
];

const dateFormat = new Intl.DateTimeFormat("en-NZ", { weekday: "short", day: "numeric", month: "short", timeZone: "Pacific/Auckland" });
const timeFormat = new Intl.DateTimeFormat("en-NZ", { hour: "numeric", minute: "2-digit", timeZone: "Pacific/Auckland" });

function findOrder(number: string, email: string): Order | undefined {
    const n = number.trim().toUpperCase().replace(/^#/, "");
    const e = email.trim().toLowerCase();
    return orders.find((o) => o.number === n && o.email.toLowerCase() === e);
}

export default function OrderStatus(): JSX.Element {
    const [order, setOrder] = useState<Order | null>(null);
    const [notFound, setNotFound] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const match = findOrder(String(data.get("order")), String(data.get("email")));
        setOrder(match ?? null);
        setNotFound(!match);
    };

    const fillDemo = (o: Order) => {
        const form = document.getElementById("order-form") as HTMLFormElement | null;
        if (!form) return;
        (form.elements.namedItem("order") as HTMLInputElement).value = o.number;
        (form.elements.namedItem("email") as HTMLInputElement).value = o.email;
        form.requestSubmit();
    };

    const stageIndex = order ? Math.max(...order.history.map((h) => STAGES.findIndex((s) => s.key === h.status))) : -1;
    const isDelivered = stageIndex === STAGES.length - 1;
    const items = order?.items.map((item) => ({ ...item, product: catalogue[item.collection]?.find((p) => p.name === item.name) })) ?? [];
    const total = items.reduce((sum, item) => sum + (item.product?.price ?? 0) * item.quantity, 0);

    return (
        <>
            <title>Order Status | beau</title>
            <HeroHeading heroName="order-status" textColor="text-white" alignment="items-center" title="Order Status" mediaURL={heroUrl} darkenBackground={true}
                subtitle="Follow your be•au order from our studio to your door." />

            <section className="max-w-5xl mx-auto px-6 md:py-16 py-10 grid md:grid-cols-[minmax(0,22rem)_1fr] gap-10 items-start">
                <div className="flex flex-col gap-4">
                    <form id="order-form" onSubmit={handleSubmit} onInput={() => setNotFound(false)} className="bg-white border border-black/10 p-6 md:p-8">
                        <h2 className="font-serif italic text-4xl">Track your order</h2>
                        <p className="font-sans text-sm text-neutral-700 mt-2">Enter the order number and email from your confirmation.</p>
                        <FloatingInput id="order-number" name="order" label="Order number" required minLength={4} maxLength={20} autoComplete="off"
                            pattern="#?[A-Za-z0-9\-]+" title="Letters, numbers and dashes only" wrapperClassName="mt-6" />
                        <FloatingInput id="order-email" name="email" label="Email" type="email" required autoComplete="email" maxLength={100} wrapperClassName="mt-4" />
                        <button type="submit" className={`${ButtonDesign} w-full! text-lg! mb-0!`}>Track order</button>
                        <p role="alert" className="font-sans text-sm text-beau min-h-5 mt-3">{notFound ? "We couldn't find an order with that number and email." : ""}</p>
                    </form>
                    <div className="p-5 bg-sand/60 border border-beau/15 font-sans text-sm">
                        <p className="font-semibold">Demo orders</p>
                        <p className="text-neutral-700 mt-1">Try one of these sample orders:</p>
                        <ul className="mt-3 flex flex-col gap-1.5">
                            {orders.slice(0, 3).map((o) => (
                                <li key={o.number}>
                                    <button type="button" onClick={() => fillDemo(o)} className="text-start text-beau underline underline-offset-4 decoration-beau/40 hover:decoration-beau">
                                        {o.number} · {o.email}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div aria-live="polite">
                    {order ? (
                        <article key={order.number} className="animate-pop-in">
                            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-black/15">
                                <div>
                                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau">Order {order.number}</p>
                                    <h2 className="font-serif italic text-4xl md:text-5xl mt-2">{STAGES[stageIndex].title}</h2>
                                    <p className="font-sans text-neutral-700 mt-2">
                                        {isDelivered
                                            ? `Delivered ${dateFormat.format(new Date(order.history[order.history.length - 1].at))} to ${order.deliverTo}.`
                                            : `Estimated delivery ${dateFormat.format(new Date(`${order.estimatedDelivery}T12:00:00+13:00`))} to ${order.deliverTo}.`}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full font-sans text-xs font-semibold uppercase tracking-wider ${isDelivered ? "bg-emerald-100 text-emerald-900" : "bg-sand text-beau"}`}>
                                    {isDelivered ? "Complete" : "In progress"}
                                </span>
                            </div>

                            <ol className="mt-8">
                                {STAGES.map((stage, i) => {
                                    const event = order.history.find((h) => h.status === stage.key);
                                    const done = i <= stageIndex;
                                    const current = i === stageIndex;
                                    return (
                                        <li key={stage.key} aria-current={current ? "step" : undefined} className="relative flex gap-4 pb-8 last:pb-0">
                                            {i < STAGES.length - 1 && (
                                                <span aria-hidden="true" className={`absolute left-[0.9375rem] top-8 bottom-0 w-0.5 ${i < stageIndex ? "bg-beau" : "bg-black/15"}`} />
                                            )}
                                            <span aria-hidden="true" className={`relative z-10 flex items-center justify-center size-8 shrink-0 rounded-full border-2 transition-colors ${
                                                done ? "bg-beau border-beau text-white" : "bg-cream border-black/20 text-neutral-400"
                                            } ${current ? "ring-4 ring-beau/20" : ""}`}>
                                                {done
                                                    ? <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                                                    : <span className="size-2 rounded-full bg-current" />}
                                            </span>
                                            <div className="pt-0.5 font-sans">
                                                <p className={`font-semibold ${done ? "text-black" : "text-neutral-500"}`}>
                                                    {stage.title}
                                                    <span className="sr-only">{done ? ", completed" : ", upcoming"}</span>
                                                </p>
                                                <p className={`text-sm ${done ? "text-neutral-700" : "text-neutral-500"}`}>
                                                    {event ? `${dateFormat.format(new Date(event.at))}, ${timeFormat.format(new Date(event.at))} · ${stage.text}` : "Pending"}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>

                            <div className="mt-8 bg-white border border-black/10">
                                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-neutral-600 px-5 pt-5">In this order</h3>
                                <ul className="px-5">
                                    {items.map((item) => (
                                        <li key={`${item.collection}-${item.name}`} className="flex items-center gap-4 py-3 border-b border-black/10 last:border-0">
                                            {item.product && <LazyImage src={item.product.photoUrl} alt="" width={48} height={64} className="w-12 aspect-3/4 object-cover shrink-0" />}
                                            <div className="flex-1 min-w-0 font-sans">
                                                <p className="text-sm"><span className="font-bold">{formatCategory(item.collection)}</span> | {item.name}</p>
                                                <p className="text-xs text-neutral-600">Qty {item.quantity}</p>
                                            </div>
                                            <p className="font-sans text-sm font-semibold tabular-nums">{dollarFormatter((item.product?.price ?? 0) * item.quantity)}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div className="flex justify-between px-5 py-4 border-t border-black/10 font-sans">
                                    <span className="font-semibold">Total <span className="font-normal text-sm text-neutral-600">(GST incl., free delivery)</span></span>
                                    <span className="font-bold tabular-nums">{dollarFormatter(total)}</span>
                                </div>
                            </div>

                            <dl className="mt-4 grid sm:grid-cols-2 gap-4 font-sans text-sm">
                                <div className="p-4 bg-white border border-black/10">
                                    <dt className="text-neutral-600">{order.courier} tracking</dt>
                                    <dd className="font-semibold mt-1 tabular-nums">{order.tracking ?? "Available once shipped"}</dd>
                                </div>
                                <div className="p-4 bg-white border border-black/10">
                                    <dt className="text-neutral-600">Delivering to</dt>
                                    <dd className="font-semibold mt-1">{order.deliverTo}</dd>
                                </div>
                            </dl>
                            <p className="font-sans text-sm text-neutral-700 mt-6">
                                Something not right? <Link to="/customer-service" className="text-beau underline underline-offset-4">Visit Customer Service</Link>.
                            </p>
                        </article>
                    ) : (
                        <div className="h-full min-h-72 flex flex-col items-center justify-center text-center border-2 border-dashed border-black/15 p-8">
                            <span aria-hidden="true" className="flex items-center justify-center size-16 rounded-full bg-sand text-beau">
                                <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                                </svg>
                            </span>
                            <p className="font-serif italic text-3xl mt-5">Your order's journey</p>
                            <p className="font-sans text-neutral-700 mt-2 max-w-sm">Enter your order details to see every step, from our studio to your door.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
