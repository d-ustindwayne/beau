import { type JSX } from "react";
import type { Props } from "../types";

interface ExtProps extends Props {
    darkenBackground?: boolean,
}

export default function HeroHeading({ textColor, title, subtitle, alignment, mediaURL, darkenBackground}: ExtProps): JSX.Element { 
    return (
        <header className={`${textColor} md:min-h-[54dvh] sm:min-h-[40dvh] min-h-[35dvh] py-5 flex flex-col bg-center font-['Times_New_Roman',serif]
        bg-no-repeat bg-cover justify-center ${alignment}`}
        style={{backgroundImage: `url(${mediaURL})`, backgroundColor: "#0000009C", backgroundBlendMode: darkenBackground? "darken" : "normal"}}>
            <h1 className="2xl:text-9xl xl:text-8xl md:text-7xl text-5xl font-medium font-['Times_New_Roman'] italic tracking-wider">{title}</h1>
            <h2 className="lg:text-5xl md:text-3xl text-2xl">{subtitle}</h2>
        </header>
    );
}