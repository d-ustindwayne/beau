import type { JSX } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import MediaText from "../components/MediaText";
import Newsletter from "../components/Newsletter";
import LazyImage from "../components/LazyImage";
import productList from "../productList.json" with {type: "json"};
import { AnchorDesign, ButtonDesign, SplideClass } from "../constants";
import affiliatePhoto from "/assets/sections/affiliate-feature.webp";
import getLookPhoto from "/assets/sections/look-highlight.webp";
import carousel1 from "/assets/hero/carousel-1.webp";
import carousel2 from "/assets/hero/carousel-2.webp";
import carousel3 from "/assets/hero/carousel-3.webp";
import { getProducts } from "../constants";
import { openJinny } from "../jinny";
import glossyType from "/assets/finishes/glossy.webp";
import matteType from "/assets/finishes/matte.webp";
import satinType from "/assets/finishes/satin.webp";

const promises = [
    { title: "Free delivery", text: "On every NZ order", icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" },
    { title: "30-day returns", text: "Plus shade exchanges", icon: "M4 9h11a5 5 0 0 1 0 10H9M4 9l4-4M4 9l4 4" },
    { title: "Cruelty-free", text: "Never tested on animals", icon: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" },
    { title: "Secure checkout", text: "Prices include GST", icon: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3" },
];

const finishes = [
    { name: "Matte", image: matteType, text: "Velvety, shine-free and long-wearing." },
    { name: "Satin", image: satinType, text: "A soft, natural sheen with comfort." },
    { name: "Glossy", image: glossyType, text: "High-shine, light-catching colour." },
];

const jinnyPrompts = ["Find me a bold red", "What suits a night out?", "Show me shades under $25"];

const headerSlides = [
    { src: carousel1, alt: "Your shade, your story" },
    { src: carousel2, alt: "Made for every version of you" },
    { src: carousel3, alt: "Wear your boldest self. Introducing the Sun Goddess Collection" },
];

const slideButton = `${ButtonDesign} my-0! z-10 absolute bottom-[15%] right-1/2 translate-x-1/2 max-sm:text-sm! max-sm:py-1.5! whitespace-nowrap shadow-lg`;

export default function Index(): JSX.Element {
    return (
        <>
            <title>beau | be you</title>
            <header id="header-carousel" className="skeleton aspect-[1440/668] overflow-hidden">
                <Splide hasTrack={false} aria-label="Featured collections" tag="section"
                    options={ { type: 'loop', rewind: true, arrow: true, drag: 'free', snap: true, classes: SplideClass } }>
                    <SplideTrack>
                        {headerSlides.map((slide, i) => (
                            <SplideSlide key={slide.src} className="relative text-center">
                                <LazyImage eager={i === 0} className="w-full h-auto" src={slide.src} alt={slide.alt} width={1440} height={668} />
                                <Link to="/shop" className={slideButton}>Shop Now</Link>
                            </SplideSlide>
                        ))}
                    </SplideTrack>
                </Splide>
            </header>

            <section aria-label="Our promise" className="bg-white border-b border-black/10">
                <ul className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">
                    {promises.map((item, i) => (
                        <li key={item.title} className={`flex items-center gap-3 md:px-6 px-4 md:py-5 py-4 border-black/10 ${i % 2 === 1 ? "border-s border-black/10" : ""} ${i === 2 ? "lg:border-s max-lg:border-t" : ""} ${i === 3 ? "max-lg:border-t" : ""}`}>
                            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7 shrink-0 text-beau" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d={item.icon} /></svg>
                            <span className="flex flex-col font-sans leading-tight">
                                <span className="font-semibold text-sm md:text-base">{item.title}</span>
                                <span className="text-xs md:text-sm text-neutral-600">{item.text}</span>
                            </span>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="collection-title" className="bg-collection flex flex-col items-center justify-center pb-12 pt-7.5">
                <h2 id="collection-title" className='font-serif lg:text-6xl md:text-5xl text-4xl text-center italic px-5 pt-5 pb-6.25'>Winter Garden Collection</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 [&>*:nth-child(n+3)]:hidden md:[&>*:nth-child(n+3)]:flex md:[&>*:nth-child(n+4)]:hidden lg:[&>*:nth-child(n+4)]:flex">
                    {getProducts(productList, "Winter_Garden")}
                </div>
                <div className="block lg:mt-6 md:mt-4 mt-2">
                    <Link to="/shop" className={AnchorDesign}>View More</Link>
                </div>
            </section>

            <section aria-labelledby="look-title" className="relative w-full min-h-[20dvh] md:min-h-[50dvh] flex md:items-center items-start justify-center md:justify-end overflow-hidden bg-neutral-800">
                <LazyImage src={getLookPhoto} alt="" width={1441} height={771} className="absolute inset-0 h-full w-full object-cover object-left"/>
                <div className="relative flex flex-col justify-center items-center py-10 lg:mr-10 md:mr-8 mr-0">
                    <h2 id="look-title" className="font-serif text-white xl:text-7xl md:text-6xl text-5xl py-4 [text-shadow:0_2px_16px_rgb(0_0_0/0.45)]">Get This Look</h2>
                    {getProducts(productList, "Sun_Goddess", false, 1, "bg-white shadow-xl")}
                </div>
            </section>

            <section aria-labelledby="finish-title" className="md:py-16 py-12 px-6">
                <h2 id="finish-title" className="font-serif lg:text-6xl md:text-5xl text-4xl text-center italic">Shop by finish</h2>
                <ul className="max-w-5xl mx-auto grid grid-cols-3 md:gap-10 gap-4 md:mt-12 mt-8">
                    {finishes.map((finish) => (
                        <li key={finish.name}>
                            <Link to={`/shop?finish=${finish.name.toLowerCase()}`} className="group flex flex-col items-center text-center">
                                <span className="w-full max-w-56 aspect-square rounded-full overflow-hidden shadow-md ring-0 ring-[#e37d72] transition-all duration-300 group-hover:ring-8 group-hover:shadow-xl">
                                    <img src={finish.image} alt="" width={224} height={224} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-700 group-hover:rotate-45 group-hover:scale-105" />
                                </span>
                                <span className="font-serif md:text-4xl text-2xl mt-4 group-hover:text-beau transition-colors">{finish.name}</span>
                                <span className="font-sans text-sm md:text-base text-neutral-700 mt-1 max-md:hidden">{finish.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="max-w-5xl mx-auto mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:px-10 bg-sand text-center sm:text-start">
                    <div>
                        <p className="font-serif italic text-3xl">Not sure where to start?</p>
                        <p className="font-sans text-neutral-800 mt-1">Answer four quick questions and we'll match you with your shade.</p>
                    </div>
                    <Link to="/shade-finder" className={`${ButtonDesign} my-0! shrink-0 text-lg!`}>Find my shade</Link>
                </div>
            </section>

            <MediaText mediaType="image" mediaURL={affiliatePhoto} mediaWidth={708} mediaHeight={585}
            mediaAlt="A beau affiliate creator wearing a signature lip shade" direction="tnp"
            title="Meet Our Affiliate" description="Join our community of creators and earn rewards for sharing looks you love."
            font="font-serif italic font-normal"
            hasButton={true} buttonContent="Explore" buttonLink="/affiliate" bgColor="bg-cream" ratio="6&6"/>

            <section aria-labelledby="jinny-feature-title" className="bg-white border-t border-black/10">
                <div className="max-w-5xl mx-auto px-6 md:py-16 py-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-start">
                    <span aria-hidden="true" className="relative shrink-0">
                        <img src={`${import.meta.env.BASE_URL}assets/brand/jinny.webp`} alt="" width={176} height={176} loading="lazy"
                            className="md:size-44 size-32 rounded-full object-cover ring-4 ring-sand shadow-lg bg-beau" />
                        <span className="absolute bottom-2 right-2 size-5 rounded-full bg-emerald-600 ring-4 ring-white" />
                    </span>
                    <div>
                        <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau">Your beauty assistant</p>
                        <h2 id="jinny-feature-title" className="font-serif italic lg:text-6xl text-5xl mt-2">Meet Jinny</h2>
                        <p className="font-sans md:text-xl text-lg leading-relaxed mt-4 text-neutral-800 max-w-2xl">Not sure where to start? Jinny can find your perfect shade, compare finishes, add favourites to your cart and answer questions, any time.</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-6">
                            {jinnyPrompts.map((prompt) => (
                                <button key={prompt} type="button" onClick={() => openJinny(prompt)}
                                    className="px-4 py-2 rounded-full border border-beau/40 bg-cream text-beau font-sans text-sm transition-colors hover:bg-beau hover:text-white">
                                    {prompt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Newsletter />
        </>
    );
}
