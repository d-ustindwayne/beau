import { Fragment, type ReactNode } from "react";
import BrandName from "./components/BrandName";

/** Replaces "be•au" in plain text with the BrandName mark, so strings passed as props match the logo too. */
export function brandify(text: string): ReactNode {
    const parts = text.split(/(be•au|Be•au)/g);
    if (parts.length === 1) return text;
    return parts.map((part, i) =>
        part === "be•au" ? <BrandName key={i} />
            : part === "Be•au" ? <BrandName key={i} capitalise />
                : <Fragment key={i}>{part}</Fragment>);
}
