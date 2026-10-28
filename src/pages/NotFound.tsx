import { type JSX } from "react";
import { Link } from "react-router-dom";
import HeroHeading from "../components/HeroHeading";
import heroUrl from "/assets/hero/default-hero.webp";
import { AnchorDesign, ButtonDesign } from "../constants";

export default function NotFound(): JSX.Element {
    return (
        <>
            <title>Page not found | beau</title>
            <HeroHeading textColor="text-white"
                alignment="items-center"
                title="404"
                mediaURL={heroUrl}
                darkenBackground={true} />
            <section className="flex flex-col items-center text-center px-6 md:py-16 py-12">
                <h2 className="font-serif italic lg:text-6xl text-4xl">This shade doesn't exist</h2>
                <p className="font-sans md:text-xl text-lg mt-4 max-w-xl">The page you're looking for may have moved or never existed. Let's get you back to something beautiful.</p>
                <Link to="/shop" className={ButtonDesign}>Shop Now</Link>
                <Link to="/" className={AnchorDesign}>Back to home</Link>
            </section>
        </>
    );
}
