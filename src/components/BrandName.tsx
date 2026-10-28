import { type JSX } from "react";

/** "be•au" with the dot centred at x-height, matching the logo, instead of the font's low bullet. */
export default function BrandName({ capitalise = false }: { capitalise?: boolean }): JSX.Element {
    return (
        <span className="whitespace-nowrap">
            <span className="sr-only">{capitalise ? "Be•au" : "be•au"}</span>
            <span aria-hidden="true">
                {capitalise ? "Be" : "be"}
                <span className="inline-block size-[0.19em] mx-[0.2em] rounded-full bg-current align-[0.22em]" />
                au
            </span>
        </span>
    );
}
