import { useState, type JSX } from "react";
import LazyImage from "./LazyImage";

interface PhotoSlotProps {
    src: string,
    alt: string,
    width: number,
    height: number,
    /** Shown in the placeholder until the photo file is added. */
    label: string,
    className?: string,
}

/** An image that shows a styled placeholder until its file exists, so new photos can be dropped in without code changes. */
export default function PhotoSlot({ src, alt, width, height, label, className = "" }: PhotoSlotProps): JSX.Element {
    const [isMissing, setIsMissing] = useState(false);

    if (isMissing) return (
        <div role="img" aria-label={alt} style={{ aspectRatio: `${width} / ${height}` }}
            className={`flex flex-col items-center justify-center gap-3 p-6 text-center bg-sand/70 border border-dashed border-beau/30 text-beau ${className}`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-9 opacity-70" fill="none" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="1.5" /><circle cx="9" cy="10" r="1.6" /><path d="M21 16l-5-5-8 8" />
            </svg>
            <p aria-hidden="true" className="font-serif italic text-xl">Photo coming soon</p>
            <p aria-hidden="true" className="font-sans text-xs text-neutral-700 max-w-xs">{label}</p>
        </div>
    );

    return <LazyImage src={src} alt={alt} width={width} height={height} className={className} onError={() => setIsMissing(true)} />;
}
