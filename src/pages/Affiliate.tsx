import { useState, useEffect, useMemo, type JSX } from "react"
import HeroHeading from "../components/HeroHeading"
import heroUrl from '/src/assets/misc_photos/DefaultHeroBackground.jpg'
import { breakpoints, SplideClass } from "../constants"
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import affiliateList from '../affiliateList.json'
import type { AffiliateDetails } from "../types"

export default function Affiliate(): JSX.Element {
    const affiliates: AffiliateDetails[] = affiliateList;
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const pageCount = useMemo(() => {
        if (width >= breakpoints['xl']) return 3;
        if (width >= breakpoints['lg']) return 3;
        if (width >= breakpoints['md']) return 2;
        return 1;
    }, [width]);

    const splideOptions = useMemo(() => ({
        type: 'loop', rewind: true, arrow: true, snap: true, perMove: 1, autoplay: true, pagination: false,
        padding: '5rem', lazyLoad: 'nearby', focus: 'center', classes: SplideClass, perPage: pageCount
    }), [pageCount]);

    return (<>
        <HeroHeading textColor="text-white"
            alignment="items-center"
            title="Affiliates"
            mediaURL={heroUrl}
            darkenBackground={true} />

        <section id="affiliate-carousel">
            <h1 className="lg:text-7xl md:text-6xl text-5xl font-[Times_New_Roman] italic p-0 pt-8 pb-2 text-center tracking-wider md:pb-4 md:pt-7.5">Partner With Us</h1>
            <Splide className="block" hasTrack={false} aria-label="Affiliate Carousel" tag="section"
                options={splideOptions}>
                <SplideTrack className="py-8">
                    {affiliates.map((aff) => {
                        return (<SplideSlide className="relative flex flex-col justify-center">
                            <div className="h-[80dvh] w-full px-5 flex">
                                <img className="h-full object-cover min-w-full" src={aff.photoUrl} alt={`${aff.name}`} />
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <p className="font-[Times_New_Roman] bold text-3xl whitespace-nowrap tracking-wider">{aff.name}</p>
                                <span className="flex flex-row items-center whitespace-nowrap gap-2">
                                    <img className="mt-1 h-6 w-6 flex items-end justify-center" src="/instagram.png" alt={`Instagram: ${aff.insta}`} />
                                    <p className="font-[OpenSans] text-2xl tracking-wider">{aff.insta}</p>
                                </span>
                            </div>
                        </SplideSlide>)
                    })}
                </SplideTrack>
            </Splide>
            <section className="flex md:flex-row flex-col w-dvw">
            <div className="lg:w-2/3 md:w-1/2 w-full p-10 ">
                <h1 className="text-5xl font-['Times_New_Roman',serif] px-5 tracking-wider">Why be•au</h1>
                <br />
                <p className="font-['Open_Sans'] text-2xl tracking-wider px-5">
                    At be•au, beauty is an art form defined by geometric precision and timeless elegance.
                    If you share our passion for high-end aesthetics, we invite you to join our exclusive affiliate collective.
                </p>
            </div>

            <div className="lg:w-1/3 md:w-1/2 w-full p-10">
                <h1 className="text-center md:text-start lg:text-4xl sm:text-3xl text-2xl font-['Times_New_Roman',serif] tracking-wider">Scan QR code to join</h1>
                <div className="w-full">
                    <img className="w-full aspect-square md:object-contain md:scale-100 scale-70" src="src/assets/misc_photos/Affiliate-QR.png" alt="QR code" />
                </div>
            </div>
        </section>

        <section className="flex md:flex-row flex-col w-dvw justify-center items-center">
            <div className="flex justify-center md:w-1/3 w-full p-10 ">
                <img src="src/assets/misc_photos/Join.png" alt="Join Image" />
            </div>
            <div className="flex justify-center md:w-1/3 w-full p-10 ">
                <img src="src/assets/misc_photos/Advertise.png" alt="Advertise Image" />
            </div>
            <div className="flex justify-center md:w-1/3 w-full p-10 ">
                <img src="src/assets/misc_photos/Earn.png" alt="Earn Image" />
            </div>
        </section>
        </section>
    </>)
}