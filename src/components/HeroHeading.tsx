import { type JSX } from "react";
import type { Props } from "../types";
import { brandify } from "../brand";

interface ExtProps extends Props {
    darkenBackground?: boolean,
    /** Page-specific banner at public/assets/hero/<name>.webp, used instead of mediaURL. */
    heroName?: string,
}

export default function HeroHeading({ textColor, title, subtitle, alignment, mediaURL, darkenBackground, heroName }: ExtProps): JSX.Element {
    const image = heroName ? `${import.meta.env.BASE_URL}assets/hero/${heroName}.webp` : mediaURL;
    return (
        <header className={`${textColor} md:min-h-[36dvh] sm:min-h-[28dvh] min-h-[24dvh] px-5 md:py-12 py-10 flex flex-col text-center bg-center font-serif
        bg-no-repeat bg-cover justify-center ${alignment} [text-shadow:0_2px_16px_rgb(0_0_0/0.35)]`}
        style={{ backgroundImage: `url(${image})`, backgroundColor: "#0000009C", backgroundBlendMode: darkenBackground ? "darken" : "normal" }}>
            <h1 className="xl:text-8xl md:text-7xl text-5xl font-medium font-serif italic tracking-wider animate-fade-in">{title}</h1>
            {subtitle ? <p className="font-sans font-light md:text-xl text-base mt-4 max-w-2xl text-balance animate-fade-in">{brandify(subtitle)}</p> : null}
        </header>
    );
}
