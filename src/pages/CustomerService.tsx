import { useMemo, useState, type JSX, type ReactNode } from "react";
import { Link } from "react-router-dom";
import HeroHeading from "../components/HeroHeading";
import heroUrl from "/assets/hero/default-hero.webp";
import { ButtonDesign } from "../constants";
import { openJinny } from "../jinny";
import { brandify } from "../brand";

interface Faq { q: string, a: ReactNode, text: string }
interface FaqGroup { title: string, items: Faq[] }

const faq = (q: string, text: string, a?: ReactNode): Faq => ({ q, text, a: a ?? brandify(text) });

const faqGroups: FaqGroup[] = [
    {
        title: "Orders & delivery", items: [
            faq("How much is delivery?", "Delivery is free on every order within New Zealand, with no minimum spend."),
            faq("How long will my order take?", "Most orders arrive within 2–5 business days. Rural addresses can take one or two days longer.",
                <>Most orders arrive within 2–5 business days. Rural addresses can take one or two days longer. You can follow your parcel on the <Link to="/order-status">Order Status</Link> page.</>),
            faq("Can I change or cancel my order?", "We pack quickly, but if you contact us within one hour of ordering we'll do our best to change or cancel it."),
            faq("Do you ship internationally?", "Not yet. We currently deliver within New Zealand only. Subscribe to our newsletter to hear first when we expand."),
        ],
    },
    {
        title: "Products & shades", items: [
            faq("How do I find my shade?", "Every product page describes the true tone and how the shade appears, including notes for colour-vision differences. You can also ask Jinny, our beauty assistant, for a recommendation."),
            faq("What's the difference between matte, satin and glossy?", "Matte has a velvety, shine-free finish and the longest wear. Satin has a soft, natural sheen. Glossy has a high-shine, light-reflecting finish."),
            faq("Are your products cruelty-free?", "Yes. be•au never tests on animals, and we only work with suppliers who share that commitment."),
            faq("I have sensitive skin. Is be•au right for me?", "Every product lists its full description, but if you have allergies or a skin condition, please check the ingredients with a health professional before use."),
        ],
    },
    {
        title: "Returns & refunds", items: [
            faq("What's your return policy?", "Unopened products can be returned within 30 days for a full refund. Opened lipsticks can be exchanged once for a different shade within 14 days.",
                <>Unopened products can be returned within 30 days for a full refund. Opened lipsticks can be exchanged once for a different shade within 14 days. Read the full <Link to="/refund-policy">Refund Policy</Link>.</>),
            faq("My product arrived damaged. What should I do?", "We're sorry! Send us a photo and your order number within 14 days and we'll replace it or refund you in full.",
                <>We're sorry! Send us a photo and your order number through our <Link to="/contact">Contact page</Link> within 14 days and we'll replace it or refund you in full.</>),
            faq("When will I get my refund?", "Refunds are processed within 3 business days of your return reaching us and usually appear in 5–10 business days."),
        ],
    },
    {
        title: "Payment & pricing", items: [
            faq("Which payment methods do you accept?", "We accept all major credit and debit cards at checkout."),
            faq("Do your prices include GST?", "Yes. All prices are in NZD and include 15% GST."),
            faq("Do you have discount codes?", "Our subscribers get exclusive offers first. Sign up to the newsletter at the bottom of our home page."),
        ],
    },
];

const quickLinks = [
    { to: "/order-status", title: "Track an order", text: "See where your parcel is.", icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" },
    { to: "/refund-policy", title: "Returns & refunds", text: "30-day returns, made simple.", icon: "M4 9h11a5 5 0 0 1 0 10H9M4 9l4-4M4 9l4 4" },
    { to: "/store-locator", title: "Find a boutique", text: "Try a shade in person.", icon: "M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" },
    { to: "/contact", title: "Contact us", text: "We reply within one day.", icon: "M4 6h16v12H4zM4 7l8 6 8-6" },
];

export default function CustomerService(): JSX.Element {
    const [query, setQuery] = useState("");
    const filteredGroups = useMemo(() => {
        const words = query.toLowerCase().split(/\s+/).filter(Boolean);
        if (!words.length) return faqGroups;
        return faqGroups
            .map((group) => ({ ...group, items: group.items.filter((item) => words.every((w) => `${item.q} ${item.text}`.toLowerCase().includes(w))) }))
            .filter((group) => group.items.length);
    }, [query]);
    const resultCount = filteredGroups.reduce((sum, g) => sum + g.items.length, 0);

    return (
        <>
            <title>Customer Service | beau</title>
            <HeroHeading heroName="customer-service" textColor="text-white" alignment="items-center" title="Customer Service" mediaURL={heroUrl} darkenBackground={true}
                subtitle="Answers, orders, returns and everything in between. We're here 24/7." />

            <section aria-label="Quick help" className="max-w-6xl mx-auto px-6 md:pt-16 pt-10">
                <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {quickLinks.map((link) => (
                        <li key={link.to}>
                            <Link to={link.to} className="group h-full flex flex-col gap-3 p-5 md:p-6 bg-white border border-black/10 transition-all duration-200 hover:border-beau hover:-translate-y-0.5 hover:shadow-lg">
                                <span aria-hidden="true" className="flex items-center justify-center size-11 rounded-full bg-sand text-beau transition-colors group-hover:bg-beau group-hover:text-white">
                                    <svg viewBox="0 0 24 24" className="size-5.5" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round"><path d={link.icon} /></svg>
                                </span>
                                <span className="font-serif text-xl md:text-2xl">{link.title}</span>
                                <span className="font-sans text-sm text-neutral-700">{link.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="faq-title" className="max-w-4xl mx-auto px-6 md:py-16 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau">FAQ</p>
                        <h2 id="faq-title" className="font-serif italic lg:text-6xl text-5xl mt-2">Frequently asked</h2>
                    </div>
                    <div className="relative md:w-72">
                        <label htmlFor="faq-search" className="sr-only">Search questions</label>
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 size-4.5 text-neutral-500" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>
                        <input id="faq-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search questions"
                            className="w-full h-11 ps-10 pe-3 border-2 border-beau bg-field font-sans text-sm outline-0 transition-shadow focus:shadow-[0_0_0_3px_rgb(132_25_16/0.18)]" />
                    </div>
                </div>
                <p aria-live="polite" className="sr-only">{query ? `${resultCount} matching questions` : ""}</p>

                {filteredGroups.length === 0 ? (
                    <div className="mt-10 py-12 text-center bg-white border border-black/10">
                        <p className="font-serif italic text-3xl">No answers found</p>
                        <p className="font-sans text-neutral-700 mt-2">Try different words, or ask Jinny.</p>
                    </div>
                ) : filteredGroups.map((group) => (
                    <div key={group.title} className="mt-10">
                        <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-neutral-600 mb-2">{group.title}</h3>
                        <div className="border-t border-black/15">
                            {group.items.map((item) => (
                                <details key={item.q} name="faq" className="group border-b border-black/15">
                                    <summary className="flex items-center justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden font-serif text-xl md:text-2xl hover:text-beau transition-colors">
                                        <span>{brandify(item.q)}</span>
                                        <span aria-hidden="true" className="relative shrink-0 size-4 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:bg-current after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:bg-current after:transition-transform after:duration-300 group-open:after:scale-y-0 text-beau" />
                                    </summary>
                                    <div className="pb-6 pe-10 font-sans text-base md:text-lg leading-relaxed text-neutral-800 animate-fade-in [&_a]:text-beau [&_a]:underline [&_a]:underline-offset-4">{item.a}</div>
                                </details>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            <section className="on-dark bg-beau text-white">
                <div className="max-w-6xl mx-auto px-6 md:py-16 py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 text-center md:text-start">
                    <div>
                        <h2 className="font-serif italic lg:text-5xl text-4xl">Still need help?</h2>
                        <p className="font-sans font-light text-lg mt-3 max-w-xl">Jinny, our beauty assistant, can find shades, check your cart and answer questions instantly. Prefer a person? Our team replies within one business day.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center shrink-0">
                        <button type="button" onClick={() => openJinny()} className={`${ButtonDesign} my-0! bg-white! text-beau! hover:bg-sand! text-lg!`}>Ask Jinny</button>
                        <Link to="/contact" className={`${ButtonDesign} my-0! bg-transparent! border-2 border-white hover:bg-white/10! text-lg!`}>Contact us</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
