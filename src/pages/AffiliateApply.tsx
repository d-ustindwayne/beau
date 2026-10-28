import { useRef, useState, type FormEvent, type JSX } from "react";
import { Link } from "react-router-dom";
import HeroHeading from "../components/HeroHeading";
import FloatingInput from "../components/FloatingInput";
import heroUrl from "/assets/hero/default-hero.webp";
import productList from "../productList.json";
import { ButtonDesign, FieldControl, FieldLabel, FieldWrapper, formatCategory } from "../constants";

const STEPS = ["About you", "Your audience", "Your story"];
const AUDIENCE_SIZES = ["Under 1k", "1k–10k", "10k–50k", "50k–100k", "100k+"];
const NICHES = ["Beauty", "Fashion", "Lifestyle", "Luxury", "Wellness", "Art & design"];
const COLLECTIONS = Object.keys(productList);
const STORY_LIMIT = 500;

interface Application {
    name: string, email: string, location: string,
    instagram: string, otherPlatform: string, audience: string, niches: string[],
    collection: string, story: string, agree: boolean,
}

const emptyApplication: Application = {
    name: "", email: "", location: "", instagram: "", otherPlatform: "", audience: "", niches: [],
    collection: "", story: "", agree: false,
};

export default function AffiliateApply(): JSX.Element {
    const [step, setStep] = useState(0);
    const [data, setData] = useState<Application>(emptyApplication);
    const [nicheError, setNicheError] = useState(false);
    const [reference, setReference] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    const update = <K extends keyof Application>(key: K, value: Application[K]) => setData((d) => ({ ...d, [key]: value }));
    const toggleNiche = (niche: string) => {
        setNicheError(false);
        update("niches", data.niches.includes(niche) ? data.niches.filter((n) => n !== niche) : [...data.niches, niche]);
    };

    /** Validates only the fields on the current step before moving on. */
    const stepIsValid = (): boolean => {
        if (!formRef.current?.reportValidity()) return false;
        if (step === 1 && data.niches.length === 0) {
            setNicheError(true);
            return false;
        }
        return true;
    };

    const goTo = (next: number) => {
        setStep(next);
        headingRef.current?.focus();
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stepIsValid()) return;
        if (step < STEPS.length - 1) return goTo(step + 1);
        setReference(`AFF-${Math.floor(1000 + Math.random() * 9000)}`);
        window.scrollTo({ top: 0 });
    };

    return (
        <>
            <title>Apply to join | beau</title>
            <HeroHeading heroName="affiliate-apply" textColor="text-white" alignment="items-center" title="Join the Collective" mediaURL={heroUrl} darkenBackground={true}
                subtitle="Apply to become a be•au affiliate. It takes about three minutes." />

            {reference ? (
                <section className="max-w-2xl mx-auto px-6 md:py-20 py-14 text-center animate-pop-in">
                    <span aria-hidden="true" className="inline-flex items-center justify-center size-16 rounded-full bg-beau text-white">
                        <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                    </span>
                    <h2 className="font-serif italic lg:text-6xl text-5xl mt-6">Thank you, {data.name.split(" ")[0]}</h2>
                    <p role="status" className="font-sans text-lg mt-4 text-neutral-800">Your application <span className="font-semibold">{reference}</span> has been received. We've sent a copy to {data.email}.</p>
                    <ol className="mt-10 text-start bg-white border border-black/10 divide-y divide-black/10 font-sans">
                        {[
                            ["Review", "Our partnerships team reviews every application personally, usually within 5 business days."],
                            ["Welcome call", "If it's a fit, we'll book a short call to get to know your audience."],
                            ["Your kit", "You'll receive your unique link, brand assets and a welcome collection."],
                        ].map(([title, text], i) => (
                            <li key={title} className="flex gap-4 p-5">
                                <span aria-hidden="true" className="font-serif italic text-2xl text-beau w-6">{i + 1}</span>
                                <span><span className="block font-semibold">{title}</span><span className="text-sm text-neutral-700">{text}</span></span>
                            </li>
                        ))}
                    </ol>
                    <p className="font-sans text-xs text-neutral-600 mt-4">Demo store: applications aren't sent anywhere.</p>
                    <Link to="/affiliate" className={`${ButtonDesign} mt-8! text-lg!`}>Back to affiliates</Link>
                </section>
            ) : (
                <section className="max-w-3xl mx-auto px-6 md:py-16 py-10">
                    <ol aria-label="Application progress" className="grid grid-cols-3 gap-2 font-sans">
                        {STEPS.map((label, i) => (
                            <li key={label} aria-current={i === step ? "step" : undefined} className="flex flex-col gap-2">
                                <span className={`h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-beau" : "bg-black/15"}`} />
                                <span className={`text-xs sm:text-sm ${i === step ? "font-semibold text-beau" : i < step ? "text-black" : "text-neutral-500"}`}>
                                    <span className="tabular-nums">{i + 1}.</span> {label}
                                    <span className="sr-only">{i < step ? ", complete" : i === step ? ", current step" : ""}</span>
                                </span>
                            </li>
                        ))}
                    </ol>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-8 bg-white border border-black/10 p-6 md:p-10 scroll-mt-6">
                        <h2 ref={headingRef} tabIndex={-1} className="font-serif italic text-4xl md:text-5xl outline-none">{STEPS[step]}</h2>
                        <p className="font-sans text-sm text-neutral-600 mt-1">Step {step + 1} of {STEPS.length}</p>

                        <div key={step} className="mt-6 animate-fade-in">
                            {step === 0 && (
                                <fieldset className="flex flex-col gap-4">
                                    <legend className="sr-only">About you</legend>
                                    <FloatingInput id="apply-name" label="Full name" autoComplete="name" required minLength={2} maxLength={64}
                                        value={data.name} onChange={(e) => update("name", e.target.value)} />
                                    <FloatingInput id="apply-email" label="Email" type="email" autoComplete="email" required maxLength={100}
                                        value={data.email} onChange={(e) => update("email", e.target.value)} />
                                    <FloatingInput id="apply-location" label="City / region" autoComplete="address-level2" required minLength={2} maxLength={64}
                                        value={data.location} onChange={(e) => update("location", e.target.value)} />
                                </fieldset>
                            )}

                            {step === 1 && (
                                <fieldset className="flex flex-col gap-6">
                                    <legend className="sr-only">Your audience</legend>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <FloatingInput id="apply-instagram" label="Instagram handle" required minLength={2} maxLength={31} pattern="@?[A-Za-z0-9._]+" title="Letters, numbers, dots and underscores"
                                            value={data.instagram} onChange={(e) => update("instagram", e.target.value)} />
                                        <FloatingInput id="apply-other" label="TikTok / YouTube (optional)" maxLength={100}
                                            value={data.otherPlatform} onChange={(e) => update("otherPlatform", e.target.value)} />
                                    </div>
                                    <fieldset>
                                        <legend className="font-sans font-semibold text-sm">Audience size <span className="text-beau">*</span></legend>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {AUDIENCE_SIZES.map((size) => (
                                                <label key={size} className="cursor-pointer">
                                                    <input type="radio" name="audience" value={size} required checked={data.audience === size} onChange={() => update("audience", size)} className="peer sr-only" />
                                                    <span className="inline-block px-4 py-2 rounded-full border border-black/25 font-sans text-sm transition-colors peer-checked:bg-beau peer-checked:border-beau peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-beau peer-focus-visible:outline-offset-2 hover:border-black">{size}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                    <fieldset aria-describedby={nicheError ? "niche-error" : undefined}>
                                        <legend className="font-sans font-semibold text-sm">What do you create? <span className="text-beau">*</span> <span className="font-normal text-neutral-600">Choose all that apply.</span></legend>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {NICHES.map((niche) => (
                                                <label key={niche} className="cursor-pointer">
                                                    <input type="checkbox" checked={data.niches.includes(niche)} onChange={() => toggleNiche(niche)} className="peer sr-only" />
                                                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/25 font-sans text-sm transition-colors peer-checked:bg-black peer-checked:border-black peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-beau peer-focus-visible:outline-offset-2 hover:border-black">
                                                        {data.niches.includes(niche) && <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>}{niche}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                        {nicheError && <p id="niche-error" role="alert" className="font-sans text-sm text-beau mt-2">Please choose at least one.</p>}
                                    </fieldset>
                                </fieldset>
                            )}

                            {step === 2 && (
                                <fieldset className="flex flex-col gap-4">
                                    <legend className="sr-only">Your story</legend>
                                    <div className={FieldWrapper}>
                                        <select id="apply-collection" required value={data.collection} onChange={(e) => update("collection", e.target.value)}
                                            className={`${FieldControl} appearance-none pe-10 cursor-pointer ${data.collection ? "" : "text-transparent"}`}>
                                            <option value="" disabled hidden></option>
                                            {COLLECTIONS.map((c) => <option key={c} value={c} className="text-black">{formatCategory(c)}</option>)}
                                        </select>
                                        <label htmlFor="apply-collection" className={`${FieldLabel} ${data.collection ? "" : "scale-100! translate-y-0!"}`}>Favourite collection</label>
                                        <svg aria-hidden="true" viewBox="0 0 24 24" className="absolute right-3 top-1/2 -translate-y-1/2 size-4 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2}><path d="M6 9l6 6 6-6" /></svg>
                                    </div>
                                    <div className={FieldWrapper}>
                                        <textarea id="apply-story" rows={5} required minLength={20} maxLength={STORY_LIMIT} placeholder=" " aria-describedby="apply-story-count"
                                            value={data.story} onChange={(e) => update("story", e.target.value)} className={`${FieldControl} pb-8 resize-y min-h-32`} />
                                        <label htmlFor="apply-story" className={FieldLabel}>Why would you like to join?</label>
                                        <span id="apply-story-count" className="absolute bottom-2 right-3 font-sans text-xs tabular-nums text-neutral-600">{data.story.length}/{STORY_LIMIT}</span>
                                    </div>
                                    <label className="flex items-start gap-3 font-sans text-sm cursor-pointer">
                                        <input type="checkbox" required checked={data.agree} onChange={(e) => update("agree", e.target.checked)} className="mt-0.5 size-4 accent-beau shrink-0" />
                                        <span>I agree to the <Link to="/terms-and-conditions" className="text-beau underline underline-offset-4">affiliate terms</Link> and <Link to="/privacy-policy" className="text-beau underline underline-offset-4">privacy policy</Link>.</span>
                                    </label>
                                </fieldset>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-black/10">
                            {step > 0
                                ? <button type="button" onClick={() => goTo(step - 1)} className="font-sans font-semibold text-sm text-beau underline underline-offset-4 decoration-beau/40 hover:decoration-beau">&larr; Back</button>
                                : <Link to="/affiliate" className="font-sans font-semibold text-sm text-neutral-700 underline underline-offset-4 hover:text-black">Cancel</Link>}
                            <button type="submit" className={`${ButtonDesign} my-0! text-lg!`}>{step < STEPS.length - 1 ? "Continue" : "Submit application"}</button>
                        </div>
                    </form>
                </section>
            )}
        </>
    );
}
