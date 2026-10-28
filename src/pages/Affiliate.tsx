import { type JSX } from "react";
import BrandName from "../components/BrandName";
import HeroHeading from "../components/HeroHeading";
import LazyImage from "../components/LazyImage";
import heroUrl from "/assets/hero/default-hero.webp";
import { ButtonDesign, SplideClass } from "../constants";
import { Link } from "react-router-dom";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import affiliateList from "../affiliateList.json";
import type { AffiliateDetails } from "../types";
import instaIcon from "/assets/icons/instagram.png"; // Since this is in public, we use the string

const splideOptions = {
    type: 'loop', rewind: true, arrow: true, snap: true, perMove: 1, autoplay: true, pagination: false,
    padding: '5rem', focus: 'center', classes: SplideClass, perPage: 3,
    breakpoints: {
        1023: { perPage: 2 },
        767: { perPage: 1, padding: '2.5rem' },
    },
};

const steps = [
    { title: "Join", text: "Apply to our exclusive affiliate collective and become a curated voice for modern luxury." },
    { title: "Advertise", text: "Share your unique link using our premium visual assets and high-end brand imagery." },
    { title: "Earn", text: "Receive competitive commissions on every successful purchase driven by your influence." },
];

const perks = [
    { title: "Competitive commission", text: "Earn on every purchase made through your unique link, paid monthly.", icon: "M12 3v18M16.5 7.5c-.7-1.4-2.3-2.2-4.2-2.2-2.4 0-4.1 1.2-4.1 3.1 0 4.4 8.6 2.2 8.6 6.5 0 2-1.9 3.2-4.4 3.2-2 0-3.7-.8-4.4-2.3" },
    { title: "Early access", text: "Be the first to wear and share every new collection before launch.", icon: "M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z" },
    { title: "Brand assets", text: "High-end imagery, shade swatches and copy, ready for your channels.", icon: "M4 5h16v14H4zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM20 15l-5-5-9 9" },
    { title: "Dedicated support", text: "A partnership team to help with links, tracking and payouts.", icon: "M4 12a8 8 0 1 1 16 0v4a2 2 0 0 1-2 2h-1v-6h3M4 12v4a2 2 0 0 0 2 2h1v-6H4" },
];

export default function Affiliate(): JSX.Element {
    const affiliates: AffiliateDetails[] = affiliateList;

    return (<>
        <title>Affiliates | beau</title>
        <HeroHeading heroName="affiliate" textColor="text-white"
            alignment="items-center"
            title="Affiliates"
            mediaURL={heroUrl}
            darkenBackground={true} />

        <section id="affiliate-carousel">
            <h2 className="lg:text-7xl md:text-6xl text-5xl font-serif italic px-5 pt-8 pb-2 text-center tracking-wider md:pb-4 md:pt-7.5">Partner With Us</h2>
            <Splide className="block" hasTrack={false} aria-label="Our affiliates" tag="section"
                options={splideOptions}>
                <SplideTrack className="py-8">
                    {affiliates.map((aff) => {
                        return (<SplideSlide key={aff.insta} className="relative flex flex-col justify-center">
                            <div className="md:h-[80dvh] h-[60dvh] w-full sm:px-5 px-2 flex">
                                <LazyImage className="h-full object-cover min-w-full" src={aff.photoUrl} alt={aff.name} width={376} height={564} />
                            </div>
                            <div className="flex flex-col justify-center items-center mt-3 px-2 text-center">
                                <p className="font-serif font-bold md:text-3xl text-2xl tracking-wider">{aff.name}</p>
                                <span className="flex flex-row items-center whitespace-nowrap gap-2">
                                    <img className="h-5 w-5" src={instaIcon} alt="" aria-hidden="true" width={20} height={20} />
                                    <p className="font-sans md:text-2xl text-xl tracking-wider"><span className="sr-only">Instagram: </span>@{aff.insta}</p>
                                </span>
                            </div>
                        </SplideSlide>)
                    })}
                </SplideTrack>
            </Splide>
            <section className="flex md:flex-row flex-col md:items-center w-full">
            <div className="lg:w-2/3 md:w-1/2 w-full md:p-10 px-6 py-8">
                <h2 className="md:text-5xl text-4xl font-serif md:px-5 tracking-wider">Why <BrandName /></h2>
                <p className="font-sans md:text-2xl text-xl leading-snug tracking-wider md:px-5 mt-6">
                    At <BrandName />, beauty is an art form defined by geometric precision and timeless elegance.
                    If you share our passion for high-end aesthetics, we invite you to join our exclusive affiliate collective.
                </p>
            </div>

            <div className="lg:w-1/3 md:w-1/2 w-full md:p-10 px-6 pb-10">
                <div className="on-dark bg-beau text-white p-8 md:p-10 text-center md:text-start shadow-xl">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-sand">Now accepting applications</p>
                    <h3 className="font-serif italic lg:text-5xl text-4xl mt-3">Join the collective</h3>
                    <p className="font-sans font-light text-lg mt-3 leading-snug">Three short steps, about three minutes. We review every application personally.</p>
                    <Link to="/affiliate/apply" className={`${ButtonDesign} mb-0! mt-6! bg-white! text-beau! hover:bg-sand! text-lg!`}>Apply now</Link>
                </div>
            </div>
        </section>

        <section aria-labelledby="how-it-works" className="px-6 md:pb-16 pb-12">
            <h2 id="how-it-works" className="font-serif italic lg:text-6xl text-5xl text-center md:pb-10 pb-8">How it works</h2>
            <ol className="max-w-6xl mx-auto flex md:flex-row flex-col items-center justify-center gap-6 lg:gap-8">
                {steps.map((step, i) => (
                    <li key={step.title} className="relative w-full max-w-sm md:max-w-none md:flex-1 md:basis-0 min-w-0 aspect-square rounded-full bg-sand flex flex-col items-center justify-center text-center lg:p-12 md:p-6 p-10 transition-transform duration-300 hover:-translate-y-1">
                        <span aria-hidden="true" className="font-sans text-xs font-semibold tracking-[0.3em] text-beau">{String(i + 1).padStart(2, "0")}</span>
                        <h3 className="font-serif italic lg:text-6xl md:text-5xl text-6xl tracking-wider mt-2">{step.title}</h3>
                        <p className="font-sans xl:text-xl lg:text-lg md:text-sm text-lg tracking-wide leading-snug mt-4 max-w-[18rem]">{step.text}</p>
                    </li>
                ))}
            </ol>
        </section>

        <section aria-labelledby="perks-title" className="bg-white border-t border-black/10">
            <div className="max-w-6xl mx-auto px-6 md:py-16 py-12">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau text-center">Membership</p>
                <h2 id="perks-title" className="font-serif italic lg:text-6xl text-5xl text-center mt-2">What you'll receive</h2>
                <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-12">
                    {perks.map((perk) => (
                        <li key={perk.title} className="flex flex-col items-center text-center">
                            <span aria-hidden="true" className="flex items-center justify-center size-14 rounded-full bg-cream border border-beau/20 text-beau">
                                <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d={perk.icon} /></svg>
                            </span>
                            <h3 className="font-serif text-2xl mt-4">{perk.title}</h3>
                            <p className="font-sans text-neutral-700 mt-2 leading-relaxed">{perk.text}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
        </section>
    </>)
}
