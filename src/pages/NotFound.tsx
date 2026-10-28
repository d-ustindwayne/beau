import { type JSX } from "react";
import { Link } from "react-router-dom";
import { ButtonDesign } from "../constants";

export default function NotFound(): JSX.Element {
    return (
        <section className="relative isolate flex flex-col items-center justify-center text-center px-6 py-20 min-h-[70dvh] overflow-hidden">
            <title>Page not found | beau</title>
            <span aria-hidden="true" className="absolute inset-0 -z-10 flex items-center justify-center font-serif italic text-beau/6 select-none leading-none text-[42vw] md:text-[28vw]">404</span>
            <p className="font-sans text-sm font-semibold uppercase tracking-[0.3em] text-beau animate-fade-in">Error 404</p>
            <h1 className="font-serif italic lg:text-7xl md:text-6xl text-5xl mt-4 animate-fade-in">This shade doesn't exist</h1>
            <p className="font-sans md:text-xl text-lg mt-5 max-w-xl text-neutral-700 text-balance animate-fade-in">The page you're looking for may have moved or never existed. Let's get you back to something beautiful.</p>
            <Link to="/" className={`${ButtonDesign} mt-8!`}>Back to home</Link>
        </section>
    );
}
