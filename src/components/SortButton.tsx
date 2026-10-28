import { type JSX } from "react";
import type { sortType } from "../types";

interface SortSetting {
    children: string,
    sortBy: sortType,
    sortFunction: (sortBy: sortType) => void,
    currentSort: sortType,
    isAsc: boolean
}

/** Short hint shown on the active option so the current direction is readable, not just implied by an arrow. */
const directionHint: Partial<Record<sortType, [asc: string, desc: string]>> = {
    alphabet: ["A–Z", "Z–A"],
    price: ["Low to high", "High to low"],
    latest: ["Oldest first", "Newest first"],
};

function SortIcon({ sortBy }: { sortBy: sortType }): JSX.Element | null {
    switch (sortBy) {
        case "random":
            return <path d="M4 7h3.5l7 10H20M4 17h3.5l2-2.9M14.5 7H20M17.5 4.5 20 7l-2.5 2.5M17.5 14.5 20 17l-2.5 2.5" />;
        case "alphabet":
            return <>
                <path d="M4 18l3.5-10L11 18M5.2 14.5h4.6" />
                <path d="M14 8h6l-6 10h6" />
            </>;
        case "price":
            return <path d="M15.5 8.5c-.6-1.3-2-2-3.5-2-2 0-3.5 1-3.5 2.7 0 3.8 7.5 1.9 7.5 5.6 0 1.7-1.6 2.7-3.8 2.7-1.6 0-3.1-.7-3.7-2M12 4.5v15" />;
        case "latest":
            return <>
                <circle cx="12" cy="12" r="8" />
                <path d="M12 7.5V12l3 2" />
            </>;
        default:
            return null;
    }
}

export function SortButton({ children, sortBy, sortFunction, currentSort, isAsc }: SortSetting): JSX.Element {
    const isActive = currentSort === sortBy;
    const hints = directionHint[sortBy];
    const hint = isActive && hints ? hints[isAsc ? 0 : 1] : null;

    return (
        <button type="button" aria-pressed={isActive}
            aria-label={`Sort by ${children}${hint ? `, ${hint}` : ""}`}
            title={hints ? `Sort by ${children}. Click again to reverse.` : `Sort by ${children}`}
            onClick={() => sortFunction(sortBy)}
            className={`shrink-0 flex items-center gap-2 h-10 sm:px-4 px-3 rounded-full font-sans text-sm sm:text-base whitespace-nowrap transition-all duration-200 ${
                isActive ? "bg-beau text-white shadow-md" : "text-black hover:bg-white/80"
            }`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <SortIcon sortBy={sortBy} />
            </svg>
            <span className="font-semibold">{children}</span>
            {hint && (
                <span aria-hidden="true" className="flex items-center gap-1 ps-2 border-s border-white/40 text-xs sm:text-sm text-sand">
                    {hint}
                    <svg viewBox="0 0 24 24" className={`size-3.5 transition-transform duration-300 ${isAsc ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14M6 13l6 6 6-6" />
                    </svg>
                </span>
            )}
        </button>
    );
}
