import type { ComponentPropsWithoutRef, JSX } from "react";
import { Link } from "react-router-dom";
import type { Props } from "../types";
import { ButtonDesign } from "../constants";
import LazyImage from "./LazyImage";

function renderMedia(mediaType: string | undefined, mediaURL: string, mediaAlt?: string, className?: string, width?: number, height?: number): JSX.Element | undefined {
    if (mediaType === "image" || mediaType === "photo") return (<LazyImage src={mediaURL} alt={mediaAlt ?? ""} width={width} height={height} className={className}/>);
    if (mediaType === "video") return (<video className={className} preload="metadata"><source src={mediaURL}/>{mediaAlt}</video>);
}

function loadButton(hasButton: boolean = false, buttonContent: string = "", buttonClass: string = ButtonDesign, buttonLink?: string): JSX.Element | null {
    if (hasButton) return (
        <div className="mt-10 flex justify-center items-center">
            {buttonLink
                ? <Link to={buttonLink} className={buttonClass}>{buttonContent}</Link>
                : <button type="button" className={buttonClass}>{buttonContent}</button>}
        </div>
    );
    else return null;
}

export default function MediaText({mediaType, mediaURL, mediaAlt, mediaWidth, mediaHeight, mediaPadding, title, subtitle, description, direction,
hasButton, buttonClass, buttonContent, buttonLink, textColor, bgColor, alignment, ratio, phoneHideMedia, font}: Props): JSX.Element & ComponentPropsWithoutRef<'div'> | undefined {
    const widthMapping: Record<string, string> = {
        '1': 'md:w-1/12', '2': 'md:w-2/12', '3': 'md:w-3/12',
        '4': 'md:w-4/12', '5': 'md:w-5/12', '6': 'md:w-6/12',
        '7': 'md:w-7/12', '8': 'md:w-8/12', '9': 'md:w-9/12',
        '10': 'md:w-10/12', '11': 'md:w-11/12'
    };
    let f: string[1] = '6', s: string[1] = '6', hideClass: string = "";
    if (phoneHideMedia) hideClass = "hidden md:inline-block";
    if (ratio !== undefined) [f, s] = ratio.trim().split("&");

    const mediaClass = `w-full h-full sm:max-h-[80dvh] max-h-[67dvh] text-center object-cover ${mediaPadding || "p-0"} ${hideClass}`;
    const textContent = (<>
        <h2 className={`lg:text-7xl md:text-5xl text-4xl my-3 ${font || "font-bold"}`}>{title}</h2>
        {subtitle? <p className="lg:text-5xl md:text-4xl text-2xl my-2 font-sans">{subtitle}</p> : null}
        <p className="xl:text-3xl md:text-2xl text-xl my-3 font-sans leading-snug">{description}</p>
        {loadButton(hasButton, buttonContent, buttonClass, buttonLink)}
    </>);

    if (direction === 'pnt') return (
        <section className="flex md:flex-row flex-col">
            <div className={`w-full ${widthMapping[f] || widthMapping['6']} min-h-full`}>
            {renderMedia(mediaType, mediaURL, mediaAlt, mediaClass, mediaWidth, mediaHeight)}</div>
            <div className={`${bgColor} ${textColor || "text-black"} lg:p-14 sm:p-10 p-7 w-full ${widthMapping[s] || widthMapping['6']} flex flex-col justify-center ${alignment || 'items-center'}`}>
                {textContent}
            </div>
        </section>
    );

    if (direction === 'tnp') return (
        <section className="flex md:flex-row flex-col-reverse">
            <div className={`${bgColor} ${textColor || "text-black"} lg:p-14 sm:p-10 p-7 w-full ${widthMapping[f] || widthMapping['6']} flex flex-col justify-center ${alignment || 'items-center'}`}>
                {textContent}
            </div>
            <div className={`w-full ${widthMapping[s] || widthMapping['6']} min-h-full`}>
            {renderMedia(mediaType, mediaURL, mediaAlt, mediaClass, mediaWidth, mediaHeight)}</div>
        </section>
    );
}
