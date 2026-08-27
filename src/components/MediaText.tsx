import type { ComponentPropsWithoutRef, JSX } from "react";
import type { Props } from "../types";
import { ButtonDesign } from "../constants";

function renderMedia(mediaType: string | undefined, mediaURL: string, mediaAlt?: string, className?: string): JSX.Element | undefined {
    if (mediaType === "image" || mediaType === "photo") return (<img src={mediaURL} alt={mediaAlt} className={className}/>);
    if (mediaType === "video") return (<video className={className}><source src={mediaURL}/>{mediaAlt}</video>);
}

function loadButton(hasButton: boolean = false, buttonContent: string = "", buttonClass: string = ButtonDesign): JSX.Element | null {
    if (hasButton) return (
        <div className="mt-10 flex justify-center items-center">
            <button className={buttonClass}>{buttonContent}</button>
        </div>
    ); 
    else return null; 
}

export default function MediaText({mediaType, mediaURL, mediaAlt, mediaPadding, title, subtitle, description, direction,
hasButton, buttonClass, buttonContent, textColor, bgColor, alignment, ratio, phoneHideMedia, font}: Props): JSX.Element & ComponentPropsWithoutRef<'div'> | undefined {
    const widthMapping: Record<string, string> = {
        '1': 'md:w-1/12', '2': 'md:w-2/12', '3': 'md:w-3/12',
        '4': 'md:w-4/12', '5': 'md:w-5/12', '6': 'md:w-6/12',
        '7': 'md:w-7/12', '8': 'md:w-8/12', '9': 'md:w-9/12',
        '10': 'md:w-10/12', '11': 'md:w-11/12'
    };
    let f: string[1] = '6', s: string[1] = '6', hideClass: string = "";
    if (phoneHideMedia) hideClass = "hidden md:inline-block";
    if (ratio !== undefined) [f, s] = ratio.trim().split("&");
    if (direction === 'pnt') return (
        <section className="flex md:flex-row flex-col">
            <div className={`w-12/12 ${widthMapping[f] || widthMapping['6']} min-h-full`}>
            {renderMedia(mediaType, mediaURL, mediaAlt, `w-full h-full sm:max-h-[80dvh] max-h-[67dvh] text-center object-cover ${mediaPadding || "p-0"} ${hideClass}`)}</div>
            <div className={`${bgColor} ${textColor || "text-black"} lg:p-14 p-10 w-12/12 ${widthMapping[s] || widthMapping['6']} flex flex-col ${alignment || 'items-center'}`}>
                <h1 className={`lg:text-7xl md:text-5xl text-4xl my-3 ${font || "font-bold"}`}>{title}</h1>
                {subtitle? <h2 className="lg:text-5xl md:text-4xl text-2xl my-2 font-[OpenSans]">{subtitle}</h2> : null}
                <p className="xl:text-3xl md:text-2xl text-xl my-3 font-[OpenSans]">{description}</p>
                {loadButton(hasButton, buttonContent, buttonClass)}
            </div>
        </section>
    );

    if (direction === 'tnp') return (
        <section className="flex md:flex-row flex-col-reverse">
            <div className={`${bgColor} ${textColor || "text-black"} lg:p-14 p-10 w-12/12 ${widthMapping[f] || widthMapping['6']} flex flex-col ${alignment || 'items-center'}`}>
                <h1 className={`lg:text-7xl md:text-5xl text-4xl my-3 ${font || "font-bold"}`}>{title}</h1>
                {subtitle? <h2 className="lg:text-5xl md:text-4xl text-2xl my-2 font-[OpenSans]">{subtitle}</h2> : null}
                <p className="xl:text-3xl md:text-2xl text-xl my-3 font-[OpenSans]">{description}</p>
                {loadButton(hasButton, buttonContent, buttonClass)}
            </div>
            <div className={`w-12/12 ${widthMapping[s] || widthMapping['6']} min-h-full`}>
            {renderMedia(mediaType, mediaURL, mediaAlt, `w-full h-full sm:max-h-[80dvh] max-h-[67dvh] text-center object-cover ${mediaPadding || "p-0"} ${hideClass}`)}</div>
        </section>
    );
}