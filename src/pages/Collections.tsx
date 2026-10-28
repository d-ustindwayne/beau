import { type JSX } from "react";
import { Link } from "react-router-dom";
import HeroHeading from "../components/HeroHeading";
import LazyImage from "../components/LazyImage";
import heroUrl from "/assets/hero/default-hero.webp";
import productList from "../productList.json";
import type { ProductList } from "../types";
import { ButtonDesign, dollarFormatter, formatCategory } from "../constants";

const catalogue: ProductList = productList;

const STORIES: Record<string, { tagline: string, story: string, bg: string }> = {
    Winter_Garden: { tagline: "Velvet matte, frost-kissed", story: "Inspired by a garden at first frost: soft petals, deep crimson and cool dusk tones in our full-pigment velvet matte.", bg: "bg-collection" },
    Sun_Goddess: { tagline: "Gilded satin radiance", story: "Warm, golden and luminous. Satin shades housed in our signature gilded geometric case, made to catch the light.", bg: "bg-sand" },
    Thorns_and_Roses: { tagline: "High-shine romance", story: "Romance with an edge. Rose, berry and blush tones in a glossy, light-reflecting finish.", bg: "bg-cream" },
    Beaunds: { tagline: "Everyday satin nudes", story: "Your lips, but better. Our most accessible collection of soft satin nudes, made for every day and every skin tone.", bg: "bg-white" },
    Liexquizo: { tagline: "Jewelled matte statements", story: "Bold, saturated matte colour wrapped in sparkling cases. For the moments you want to be remembered.", bg: "bg-collection" },
};

export default function Collections(): JSX.Element {
    return (
        <>
            <title>Collections | beau</title>
            <HeroHeading heroName="collections" textColor="text-white" alignment="items-center" title="Collections" mediaURL={heroUrl} darkenBackground={true}
                subtitle="Five collections, each with its own finish and its own story." />

            {Object.entries(catalogue).map(([key, products], i) => {
                const story = STORIES[key] ?? { tagline: "", story: "", bg: "bg-cream" };
                const name = formatCategory(key);
                const prices = products.map((p) => p.price);
                const finishes = [...new Set(products.map((p) => p.lipstickType))].join(" & ");
                const isReversed = i % 2 === 1;
                return (
                    <section key={key} aria-labelledby={`collection-${key}`} className={story.bg}>
                        <div className={`max-w-7xl mx-auto px-6 md:py-16 py-12 flex flex-col gap-8 lg:gap-14 lg:items-center ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
                            <div className="lg:w-2/5 text-center lg:text-start">
                                <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau">
                                    <span aria-hidden="true" className="tabular-nums">{String(i + 1).padStart(2, "0")} · </span>{story.tagline}
                                </p>
                                <h2 id={`collection-${key}`} className="font-serif italic lg:text-6xl text-5xl mt-3">{name}</h2>
                                <p className="font-sans md:text-xl text-lg leading-relaxed mt-4 text-neutral-800 max-w-xl mx-auto lg:mx-0">{story.story}</p>
                                <dl className="flex justify-center lg:justify-start gap-8 mt-6 font-sans">
                                    <div><dt className="text-xs uppercase tracking-wider text-neutral-600">Shades</dt><dd className="font-serif text-2xl">{products.length}</dd></div>
                                    <div><dt className="text-xs uppercase tracking-wider text-neutral-600">Finish</dt><dd className="font-serif text-2xl">{finishes}</dd></div>
                                    <div><dt className="text-xs uppercase tracking-wider text-neutral-600">From</dt><dd className="font-serif text-2xl">{dollarFormatter(Math.min(...prices))}</dd></div>
                                </dl>
                                <Link to={`/shop?collections=${key.toLowerCase().replace(/_/g, "-")}`} className={`${ButtonDesign} mt-8! mb-0! text-lg!`}>Shop {name}</Link>
                            </div>
                            <ul className="lg:w-3/5 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
                                {products.map((p, j) => (
                                    <li key={p.name} className={j % 2 === 1 ? "sm:translate-y-6" : ""}>
                                        <Link to={`/shop?collections=${key.toLowerCase().replace(/_/g, "-")}`} className="group block bg-white shadow-sm transition-shadow hover:shadow-xl">
                                            <span className="block overflow-hidden">
                                                <LazyImage src={p.photoUrl} alt={`${name} – ${p.name}`} width={247} height={330} className="w-full aspect-3/4 object-cover transition-transform duration-500 group-hover:scale-105" />
                                            </span>
                                            <span className="flex items-baseline justify-between gap-2 px-3 py-2.5 font-sans">
                                                <span className="font-light text-lg truncate group-hover:text-beau transition-colors">{p.name}</span>
                                                <span className="text-sm text-neutral-700 tabular-nums">{dollarFormatter(p.price)}</span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                );
            })}
        </>
    );
}
