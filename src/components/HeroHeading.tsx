import { type JSX } from "react";
import type { Props } from "../types";

interface ExtProps extends Props {
    darkenBackground?: boolean,
}

export default function HeroHeading({ textColor, title, subtitle, alignment, mediaURL, darkenBackground}: ExtProps): JSX.Element {
    return (
        <header className={`${textColor} md:min-h-[54dvh] sm:min-h-[40dvh] min-h-[35dvh] px-5 py-5 flex flex-col text-center bg-center font-serif
        bg-no-repeat bg-cover justify-center ${alignment} [text-shadow:0_2px_16px_rgb(0_0_0/0.35)]`}
        style={{backgroundImage: `url(${mediaURL})`, backgroundColor: "#0000009C", backgroundBlendMode: darkenBackground? "darken" : "normal"}}>
            <h1 className="2xl:text-9xl xl:text-8xl md:text-7xl text-5xl font-medium font-serif italic tracking-wider animate-fade-in">{title}</h1>
            {subtitle ? <p className="lg:text-5xl md:text-3xl text-2xl mt-3">{subtitle}</p> : null}
        </header>
    );
}
