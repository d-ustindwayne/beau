import { useMemo, useState, type JSX } from "react";
import HeroHeading from "../components/HeroHeading";
import Newsletter from "../components/Newsletter";
import heroUrl from "/assets/hero/default-hero.webp";
import productList from "../productList.json";
import type { ProductList } from "../types";
import sortArray, { getProducts } from "../constants";

const catalogue: ProductList = productList;
const allProducts: JSX.Element[] = Object.keys(catalogue).flatMap((category) => getProducts(catalogue, category));

const TIERS = [
    { max: 25, label: "Under $25" },
    { max: 55, label: "Under $55" },
];

export default function Sale(): JSX.Element {
    const [max, setMax] = useState(55);
    const products = useMemo(() => sortArray(allProducts.filter((p) => p.props.price < max), "price"), [max]);

    return (
        <>
            <title>Sale | beau</title>
            <HeroHeading textColor="text-white" alignment="items-center" title="Little Luxuries" mediaURL={heroUrl} darkenBackground={true}
                subtitle="Signature be•au shades at gift-ready prices." />

            <section className="bg-sand">
                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-1 text-center font-sans">
                    <span className="px-2.5 py-0.5 bg-beau text-white text-[11px] font-semibold uppercase tracking-wider">Coming soon</span>
                    <p className="text-sm md:text-base">Our seasonal sale returns soon. <a href="#newsletter" className="font-semibold text-beau underline underline-offset-4">Subscribers get early access.</a></p>
                </div>
            </section>

            <section aria-labelledby="sale-title" className="md:py-14 py-10">
                <div className="px-4 md:px-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 id="sale-title" className="font-serif italic lg:text-6xl text-5xl">Shop by price</h2>
                        <p aria-live="polite" className="font-sans text-neutral-700 mt-2">{products.length} shades {TIERS.find((t) => t.max === max)?.label.toLowerCase()}, with free delivery.</p>
                    </div>
                    <div role="group" aria-label="Price range" className="flex gap-1 p-1 rounded-full bg-sand w-fit">
                        {TIERS.map((tier) => (
                            <button key={tier.max} type="button" aria-pressed={max === tier.max} onClick={() => setMax(tier.max)}
                                className={`h-10 px-5 rounded-full font-sans font-semibold text-sm sm:text-base transition-all duration-200 ${max === tier.max ? "bg-beau text-white shadow-md" : "hover:bg-white/80"}`}>
                                {tier.label}
                            </button>
                        ))}
                    </div>
                </div>
                <div key={max} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pt-6 animate-fade-in">
                    {products}
                </div>
            </section>

            <Newsletter />
        </>
    );
}
