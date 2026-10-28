import { type JSX, type ReactNode } from "react";
import BrandName from "./BrandName";
import { Link } from "react-router-dom";
import HeroHeading from "./HeroHeading";
import heroUrl from "/assets/hero/default-hero.webp";

export interface LegalSection {
    id: string,
    title: string,
    body: ReactNode
}

interface LegalPageProps {
    title: string,
    pageTitle: string,
    intro: string,
    updated: string,
    sections: LegalSection[],
    heroName: string
}

/** Shared layout for policy pages: compact hero, sticky table of contents and a readable text column. */
export default function LegalPage({ title, pageTitle, intro, updated, sections, heroName }: LegalPageProps): JSX.Element {
    return (
        <>
            <title>{`${pageTitle} | beau`}</title>
            <HeroHeading heroName={heroName} textColor="text-white" alignment="items-center" title={title} subtitle={intro} mediaURL={heroUrl} darkenBackground={true} />

            <div className="max-w-6xl mx-auto px-6 md:py-16 py-10 grid lg:grid-cols-[15rem_1fr] gap-x-16 gap-y-8">
                <nav aria-label="On this page" className="lg:sticky lg:top-8 self-start">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau">On this page</p>
                    <ol className="mt-4 space-y-1 border-s border-beau/20 font-sans text-sm max-lg:columns-2 max-sm:columns-1">
                        {sections.map((section, i) => (
                            <li key={section.id} className="break-inside-avoid">
                                <a href={`#${section.id}`} className="flex gap-2 -ms-px ps-4 py-1 border-s border-transparent text-neutral-700 hover:text-beau hover:border-beau transition-colors">
                                    <span className="tabular-nums text-neutral-500">{String(i + 1).padStart(2, "0")}</span>{section.title}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>

                <article className="max-w-3xl font-sans text-neutral-800">
                    <p className="text-sm text-neutral-600">Last updated <time>{updated}</time></p>
                    <p className="mt-4 p-4 bg-sand/60 border-s-4 border-beau text-sm leading-relaxed">
                        <BrandName /> is a UI/UX showcase. These policies are written for a fictional store and are not a legal agreement.
                    </p>
                    {sections.map((section, i) => (
                        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="scroll-mt-8 pt-10 first-of-type:pt-8">
                            <h2 id={`${section.id}-title`} className="font-serif text-3xl md:text-4xl italic text-black flex items-baseline gap-3">
                                <span aria-hidden="true" className="font-sans not-italic text-base text-beau tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                                {section.title}
                            </h2>
                            <div className="mt-4 space-y-4 text-base md:text-lg leading-relaxed [&_ul]:list-disc [&_ul]:ps-6 [&_ul]:space-y-2 [&_a]:text-beau [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-black">
                                {section.body}
                            </div>
                        </section>
                    ))}
                    <div className="mt-14 p-6 md:p-8 bg-cream border border-beau/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <p className="font-serif italic text-2xl text-black">Still have questions?</p>
                            <p className="text-sm text-neutral-700 mt-1">Our team is here to help, 24/7.</p>
                        </div>
                        <Link to="/contact" className="shrink-0 inline-block bg-beau text-white uppercase tracking-wide font-semibold text-sm px-6 py-3 transition-colors hover:bg-beau-dark">Contact us</Link>
                    </div>
                </article>
            </div>
        </>
    );
}
