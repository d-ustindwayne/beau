import { useMemo, useRef, useState, type JSX, type ReactNode } from "react";
import { Link } from "react-router-dom";
import HeroHeading from "../components/HeroHeading";
import ProductCard from "../components/ProductCard";
import LazyImage from "../components/LazyImage";
import heroUrl from "/assets/hero/default-hero.webp";
import productList from "../productList.json";
import type { ProductList } from "../types";
import { ButtonDesign, dollarFormatter, formatCategory } from "../constants";
import { openJinny } from "../jinny";

const catalogue: ProductList = productList;
const products = Object.entries(catalogue).flatMap(([collection, items]) => items.map((p) => ({ ...p, collection })));

interface Option { value: string, label: string, hint: string, icon: ReactNode }
interface Question { id: "occasion" | "finish" | "intensity" | "budget", title: string, options: Option[] }

const lineIcon = (d: string) => (
    <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const swatch = (color: string) => <span className="size-8 rounded-full ring-1 ring-black/10" style={{ backgroundColor: color }} />;

const QUESTIONS: Question[] = [
    {
        id: "occasion", title: "What's the occasion?", options: [
            { value: "everyday", label: "Everyday", hint: "Coffee runs and errands", icon: lineIcon("M12 4V2M12 22v-2M4 12H2M22 12h-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z") },
            { value: "work", label: "Work", hint: "Polished, not loud", icon: lineIcon("M3 8h18v11H3zM8 8V5h8v3M3 13h18") },
            { value: "date", label: "Date night", hint: "A little romance", icon: lineIcon("M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z") },
            { value: "event", label: "Big event", hint: "All eyes on you", icon: lineIcon("M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z") },
        ],
    },
    {
        id: "finish", title: "Which finish do you love?", options: [
            { value: "Matte", label: "Matte", hint: "Velvety and long-wearing", icon: "◐" },
            { value: "Satin", label: "Satin", hint: "A soft, natural sheen", icon: "◑" },
            { value: "Glossy", label: "Glossy", hint: "High shine, light-catching", icon: "●" },
            { value: "any", label: "Surprise me", hint: "I'm open to anything", icon: "?" },
        ],
    },
    {
        id: "intensity", title: "How bold are you feeling?", options: [
            { value: "soft", label: "Soft & natural", hint: "Your lips, but better", icon: swatch("#d4a08c") },
            { value: "medium", label: "Somewhere between", hint: "Noticeable, still easy", icon: swatch("#b4475a") },
            { value: "bold", label: "Full statement", hint: "Hard to miss", icon: swatch("#841910") },
        ],
    },
    {
        id: "budget", title: "And your budget?", options: [
            { value: "25", label: "Under $25", hint: "A little luxury", icon: "$" },
            { value: "55", label: "Under $55", hint: "The sweet spot", icon: "$$" },
            { value: "any", label: "Treat myself", hint: "Price is no object", icon: "$$$" },
        ],
    },
];

// How each collection leans, used to score answers. Beaunds are everyday nudes; Liexquizo is the boldest.
const COLLECTION_TRAITS: Record<string, { intensity: string, occasions: string[] }> = {
    Beaunds: { intensity: "soft", occasions: ["everyday", "work"] },
    Winter_Garden: { intensity: "medium", occasions: ["everyday", "work", "date"] },
    Thorns_and_Roses: { intensity: "medium", occasions: ["date", "everyday"] },
    Sun_Goddess: { intensity: "medium", occasions: ["event", "date"] },
    Liexquizo: { intensity: "bold", occasions: ["event", "date"] },
};

type Answers = Partial<Record<Question["id"], string>>;

function rankProducts(answers: Answers) {
    const budget = answers.budget && answers.budget !== "any" ? Number(answers.budget) : Infinity;
    const scored = products.map((p) => {
        const traits = COLLECTION_TRAITS[p.collection] ?? { intensity: "medium", occasions: [] };
        let score = 0;
        const reasons: string[] = [];
        if (answers.finish === "any" || answers.finish === p.lipstickType) { score += 3; if (answers.finish !== "any") reasons.push(`the ${p.lipstickType.toLowerCase()} finish you love`); }
        if (traits.intensity === answers.intensity) { score += 3; reasons.push(answers.intensity === "bold" ? "a bold, statement colour" : answers.intensity === "soft" ? "soft, natural colour" : "balanced, wearable colour"); }
        if (answers.occasion && traits.occasions.includes(answers.occasion)) { score += 2; reasons.push(`perfect for ${QUESTIONS[0].options.find((o) => o.value === answers.occasion)?.label.toLowerCase()}`); }
        if (p.price <= budget) score += 2; else score -= 10;
        return { product: p, score, reasons };
    });
    const best = Math.max(...scored.map((s) => s.score), 1);
    return scored
        .sort((a, b) => b.score - a.score || a.product.price - b.product.price)
        .slice(0, 3)
        .map((s) => ({ ...s, match: Math.max(55, Math.round((s.score / Math.max(best, 10)) * 100)) }));
}

export default function ShadeFinder(): JSX.Element {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const headingRef = useRef<HTMLHeadingElement>(null);
    const isDone = step >= QUESTIONS.length;
    const results = useMemo(() => (isDone ? rankProducts(answers) : []), [isDone, answers]);
    const question = QUESTIONS[Math.min(step, QUESTIONS.length - 1)];

    const choose = (value: string) => {
        setAnswers((a) => ({ ...a, [question.id]: value }));
        // A short pause lets the selection register visually before moving on.
        setTimeout(() => {
            setStep((s) => s + 1);
            headingRef.current?.focus();
        }, 220);
    };

    const restart = () => {
        setAnswers({});
        setStep(0);
        headingRef.current?.focus();
    };

    const top = results[0];

    return (
        <>
            <title>Shade Finder | beau</title>
            <HeroHeading heroName="shade-finder" textColor="text-white" alignment="items-center" title="Shade Finder" mediaURL={heroUrl} darkenBackground={true}
                subtitle="Four quick questions to find your perfect be•au shade." />

            <section className="max-w-5xl mx-auto px-6 md:py-16 py-10">
                <div className="flex items-center gap-3 font-sans text-sm" aria-hidden={isDone}>
                    <div className="flex-1 h-1.5 rounded-full bg-black/10 overflow-hidden">
                        <div className="h-full bg-beau rounded-full transition-[width] duration-500 ease-out" style={{ width: `${(Math.min(step, QUESTIONS.length) / QUESTIONS.length) * 100}%` }} />
                    </div>
                    <span className="tabular-nums text-neutral-700 whitespace-nowrap text-end">{isDone ? "Complete" : `Question ${step + 1} of ${QUESTIONS.length}`}</span>
                </div>

                {!isDone ? (
                    <div key={step} className="mt-10 animate-pop-in">
                        <h2 ref={headingRef} tabIndex={-1} id="quiz-question" className="font-serif italic lg:text-6xl text-4xl text-center outline-none">{question.title}</h2>
                        <div role="group" aria-labelledby="quiz-question" className={`grid gap-4 mt-10 ${question.options.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"}`}>
                            {question.options.map((option) => {
                                const isSelected = answers[question.id] === option.value;
                                return (
                                    <button key={option.value} type="button" aria-pressed={isSelected} onClick={() => choose(option.value)}
                                        className={`group flex flex-col items-center justify-center gap-2 text-center p-6 md:p-8 min-h-44 border-2 bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                                            isSelected ? "border-beau shadow-lg -translate-y-1" : "border-black/10 hover:border-beau/50"
                                        }`}>
                                        <span aria-hidden="true" className="flex items-center justify-center size-14 rounded-full bg-cream text-beau font-serif text-2xl transition-colors group-hover:bg-sand">{option.icon}</span>
                                        <span className="font-serif text-2xl md:text-3xl">{option.label}</span>
                                        <span className="font-sans text-sm text-neutral-600">{option.hint}</span>
                                    </button>
                                );
                            })}
                        </div>
                        {step > 0 && (
                            <div className="text-center mt-8">
                                <button type="button" onClick={() => setStep((s) => s - 1)} className="font-sans font-semibold text-sm text-beau underline underline-offset-4 decoration-beau/40 hover:decoration-beau">&larr; Previous question</button>
                            </div>
                        )}
                    </div>
                ) : top && (
                    <div className="mt-10 animate-pop-in">
                        <h2 ref={headingRef} tabIndex={-1} className="font-serif italic lg:text-6xl text-4xl text-center outline-none">Your perfect match</h2>
                        <article className="mt-10 grid md:grid-cols-[minmax(0,20rem)_1fr] gap-8 items-center bg-white border border-black/10 p-6 md:p-10 shadow-sm">
                            <div className="relative">
                                <LazyImage src={top.product.photoUrl} alt={`${top.product.name} lipstick from ${formatCategory(top.product.collection)}`} width={320} height={427} className="w-full aspect-3/4 object-cover" />
                                <span className="absolute top-3 left-3 px-3 py-1 bg-beau text-white font-sans text-xs font-semibold uppercase tracking-wider">{top.match}% match</span>
                            </div>
                            <div className="text-center md:text-start">
                                <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau">{formatCategory(top.product.collection)} · {top.product.lipstickType}</p>
                                <h3 className="font-serif lg:text-7xl text-5xl mt-2">{top.product.name}</h3>
                                <p className="font-serif text-2xl mt-2">{dollarFormatter(top.product.price)}</p>
                                {top.reasons.length > 0 && (
                                    <p className="font-sans text-lg text-neutral-800 mt-4 leading-relaxed">We picked it for {top.reasons.join(", ").replace(/, ([^,]*)$/, " and $1")}.</p>
                                )}
                                <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start">
                                    <Link to={`/shop?collections=${top.product.collection.toLowerCase().replace(/_/g, "-")}`} className={`${ButtonDesign} my-0! text-lg!`}>Shop the collection</Link>
                                    <button type="button" onClick={() => openJinny(`I matched with ${top.product.name} from ${formatCategory(top.product.collection)} in the Shade Finder. How should I wear it?`)}
                                        className={`${ButtonDesign} my-0! text-lg! bg-transparent! text-beau! border-2 border-beau hover:bg-beau/5!`}>Ask Jinny about it</button>
                                </div>
                            </div>
                        </article>

                        <h3 className="font-serif italic text-4xl text-center mt-14">You might also love</h3>
                        <div className="grid grid-cols-2 gap-4 mt-6 max-w-2xl mx-auto">
                            {results.slice(1).map(({ product }) => (
                                <ProductCard key={`${product.collection}-${product.name}`} productCategory={product.collection} productName={product.name}
                                    lipstickType={product.lipstickType} description={product.description} price={product.price}
                                    bgColor="bg-white" imageURL={product.photoUrl} imageAlt={`${product.name} lipstick from ${formatCategory(product.collection)}`} />
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <button type="button" onClick={restart} className="font-sans font-semibold text-beau underline underline-offset-4 decoration-beau/40 hover:decoration-beau">Retake the quiz</button>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}
