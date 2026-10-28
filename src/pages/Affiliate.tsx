import { type JSX } from "react";
import HeroHeading from "../components/HeroHeading";
import LazyImage from "../components/LazyImage";
import heroUrl from "/assets/hero/default-hero.webp";
import { SplideClass } from "../constants";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import affiliateList from "../affiliateList.json";
import type { AffiliateDetails } from "../types";
import qrCode from "/assets/sections/affiliate-qr.png";
import joinImg from "/assets/sections/affiliate-join.webp";
import advertiseImg from "/assets/sections/affiliate-advertise.webp";
import earnImg from "/assets/sections/affiliate-earn.webp";
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
    { image: joinImg, alt: "Join: Apply to our exclusive affiliate collective and become a curated voice for modern luxury." },
    { image: advertiseImg, alt: "Advertise: Share your unique link using our premium visual assets and high-end brand imagery." },
    { image: earnImg, alt: "Earn: Receive competitive commissions on every successful purchase driven by your influence." },
];

export default function Affiliate(): JSX.Element {
    const affiliates: AffiliateDetails[] = affiliateList;

    return (<>
        <title>Affiliates | beau</title>
        <HeroHeading textColor="text-white"
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
                <h2 className="md:text-5xl text-4xl font-serif md:px-5 tracking-wider">Why be•au</h2>
                <p className="font-sans md:text-2xl text-xl leading-snug tracking-wider md:px-5 mt-6">
                    At be•au, beauty is an art form defined by geometric precision and timeless elegance.
                    If you share our passion for high-end aesthetics, we invite you to join our exclusive affiliate collective.
                </p>
            </div>

            <div className="lg:w-1/3 md:w-1/2 w-full md:p-10 px-6 pb-8 flex flex-col items-center md:items-start">
                <h3 className="text-center md:text-start lg:text-4xl sm:text-3xl text-2xl font-serif tracking-wider">Scan QR code to join</h3>
                <div className="w-full max-w-xs md:max-w-none mt-4">
                    <img className="w-full aspect-square object-contain [image-rendering:pixelated]" src={qrCode} alt="QR code to join the beau affiliate programme" width={200} height={200} loading="lazy" />
                </div>
            </div>
        </section>

        <section className="flex md:flex-row flex-col w-full justify-center items-center pb-6">
            {steps.map((step) => (
                <div key={step.image} className="flex justify-center md:w-1/3 w-full lg:p-10 p-6">
                    <LazyImage src={step.image} alt={step.alt} width={400} height={400} className="w-full max-w-sm aspect-square object-contain rounded-full" />
                </div>
            ))}
        </section>
        </section>
    </>)
}
