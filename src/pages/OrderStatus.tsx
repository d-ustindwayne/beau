import { useState, type FormEvent, type JSX } from "react";
import { Link } from "react-router-dom";
import HeroHeading from "../components/HeroHeading";
import FloatingInput from "../components/FloatingInput";
import heroUrl from "/assets/hero/default-hero.webp";
import { ButtonDesign } from "../constants";

const STAGES = [
    { title: "Order placed", text: "We've received your order." },
    { title: "Packed", text: "Wrapped with care at our Manukau studio." },
    { title: "Shipped", text: "Handed to our courier partner." },
    { title: "Out for delivery", text: "Arriving today." },
    { title: "Delivered", text: "Enjoy your new shade." },
];

const dateFormat = new Intl.DateTimeFormat("en-NZ", { weekday: "short", day: "numeric", month: "short" });
const DAY = 86_400_000;

interface OrderResult {
    number: string,
    stage: number,
    dates: Date[],
    tracking: string,
}

/** Demo lookup: derives a stable status from the order number, so the same number always shows the same progress. */
function lookupOrder(raw: string): OrderResult {
    const number = raw.trim().toUpperCase();
    const hash = [...number].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
    const stage = hash % STAGES.length;
    const placed = Date.now() - stage * DAY - DAY / 3;
    return {
        number,
        stage,
        dates: STAGES.map((_, i) => new Date(placed + i * DAY)),
        tracking: `NZ${String(hash).padStart(10, "0").slice(0, 10)}`,
    };
}

export default function OrderStatus(): JSX.Element {
    const [order, setOrder] = useState<OrderResult | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        setOrder(lookupOrder(String(data.get("order"))));
    };

    const isDelivered = order?.stage === STAGES.length - 1;

    return (
        <>
            <title>Order Status | beau</title>
            <HeroHeading textColor="text-white" alignment="items-center" title="Order Status" mediaURL={heroUrl} darkenBackground={true}
                subtitle="Follow your be•au order from our studio to your door." />

            <section className="max-w-5xl mx-auto px-6 md:py-16 py-10 grid md:grid-cols-[minmax(0,22rem)_1fr] gap-10 items-start">
                <form onSubmit={handleSubmit} className="bg-white border border-black/10 p-6 md:p-8">
                    <h2 className="font-serif italic text-4xl">Track your order</h2>
                    <p className="font-sans text-sm text-neutral-700 mt-2">Enter the order number from your confirmation email.</p>
                    <FloatingInput id="order-number" name="order" label="Order number" required minLength={4} maxLength={20} autoComplete="off"
                        pattern="[A-Za-z0-9\-]+" title="Letters, numbers and dashes only" wrapperClassName="mt-6" />
                    <FloatingInput id="order-email" name="email" label="Email" type="email" required autoComplete="email" maxLength={100} wrapperClassName="mt-4" />
                    <button type="submit" className={`${ButtonDesign} w-full! text-lg! mb-0!`}>Track order</button>
                    <p className="font-sans text-xs text-neutral-600 mt-4">Demo store: any order number works. Try <span className="font-semibold">BEAU-1024</span>.</p>
                </form>

                <div aria-live="polite">
                    {order ? (
                        <article key={order.number} className="animate-pop-in">
                            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-black/15">
                                <div>
                                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau">Order {order.number}</p>
                                    <h2 className="font-serif italic text-4xl md:text-5xl mt-2">{STAGES[order.stage].title}</h2>
                                    <p className="font-sans text-neutral-700 mt-2">
                                        {isDelivered
                                            ? `Delivered ${dateFormat.format(order.dates[order.stage])}.`
                                            : `Estimated delivery ${dateFormat.format(order.dates[STAGES.length - 1])}.`}
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full font-sans text-xs font-semibold uppercase tracking-wider ${isDelivered ? "bg-emerald-100 text-emerald-900" : "bg-sand text-beau"}`}>
                                    {isDelivered ? "Complete" : "In progress"}
                                </span>
                            </div>

                            <ol className="mt-8">
                                {STAGES.map((stage, i) => {
                                    const done = i <= order.stage;
                                    const current = i === order.stage;
                                    return (
                                        <li key={stage.title} aria-current={current ? "step" : undefined} className="relative flex gap-4 pb-8 last:pb-0">
                                            {i < STAGES.length - 1 && (
                                                <span aria-hidden="true" className={`absolute left-[0.9375rem] top-8 bottom-0 w-0.5 ${i < order.stage ? "bg-beau" : "bg-black/15"}`} />
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
                                                    {done ? `${dateFormat.format(order.dates[i])} · ${stage.text}` : "Pending"}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ol>

                            <dl className="mt-8 grid sm:grid-cols-2 gap-4 font-sans text-sm">
                                <div className="p-4 bg-white border border-black/10">
                                    <dt className="text-neutral-600">Courier tracking</dt>
                                    <dd className="font-semibold mt-1 tabular-nums">{order.stage >= 2 ? order.tracking : "Available once shipped"}</dd>
                                </div>
                                <div className="p-4 bg-white border border-black/10">
                                    <dt className="text-neutral-600">Delivery</dt>
                                    <dd className="font-semibold mt-1">Free standard delivery</dd>
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
