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

            <MediaText mediaType="image" mediaURL={affiliatePhoto} mediaWidth={708} mediaHeight={585}
            mediaAlt="A beau affiliate creator wearing a signature lip shade" direction="tnp"
            title="Meet Our Affiliate" description="Join our community of creators and earn rewards for sharing looks you love."
            font="font-serif italic font-normal"
            hasButton={true} buttonContent="Explore" buttonLink="/affiliate" bgColor="bg-cream" ratio="6&6"/>

            <Newsletter />
        </>
    );
}
