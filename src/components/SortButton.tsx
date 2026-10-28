import { type JSX } from "react";
import type { sortType } from "../types";

interface SortSetting {
    children: string,
    sortBy: sortType,
    sortFunction: (sortBy: sortType) => void,
    currentSort: sortType,
    isAsc: boolean
}

export function SortButton({ children, sortBy, sortFunction, currentSort, isAsc }: SortSetting): JSX.Element {
    const isActive = currentSort === sortBy;

    const renderIcon = () => {
        switch (sortBy) {
            case "alphabet":
                return <>
                <text x="6.5" y="11.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor" stroke="none">A</text>
                <text x="6.5" y="22.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor" stroke="none">Z</text>
                <path d={isActive && isAsc ? "M14 14l3.5 3.5 3.5-3.5M17.5 6.5v11" : "M14 10l3.5-3.5 3.5 3.5M17.5 6.5v11"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </>
                
            case "latest":
                return <>
                <circle cx="8" cy="12" r="6.7" strokeWidth="1.5" /><path d="M6.5 12L6.5 7.5M6.5 12L9.5 14.5" strokeWidth="1.5" />
                <path d={isActive && isAsc ? "M16.5 19.5l2 2 2-2M18.5 14.5v5" : "M16.5 16.5l2-2 2 2M18.5 14.5v5"} strokeWidth="1.8" />
                </>;
            case "price":
                return <>
                <text x="7" y="20" textAnchor="middle" fontSize="20" fontWeight="600" fill="currentColor" stroke="none">$</text>
                <path d={isActive && isAsc ? "M14 14l3.5 3.5 3.5-3.5M17.5 6.5v11" : "M14 10l3.5-3.5 3.5 3.5M17.5 6.5v11"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </>
            default:
                return null;
        }
    };

    return (
        <button type="button" aria-pressed={isActive}
            aria-label={`Sort by ${children}${isActive ? `, ${isAsc ? "ascending" : "descending"}` : ""}`}
            title={`Sort by ${children}`}
            className={`group flex items-center justify-center p-2 cursor-pointer rounded-lg w-fit min-w-15 h-15 transition-colors duration-200 ${isActive ? 'bg-beau text-white' : 'bg-sand-dark text-black hover:bg-sand'}`} onClick={() => sortFunction(sortBy)}>
            <span aria-hidden="true" className="w-8.5 h-8.5 flex justify-center items-center">
                <svg viewBox="0 0 24 24" className={`w-8.5 h-8.5 ${isActive ? 'text-white' : 'text-black'}`}>
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        {renderIcon()}
                    </g>
                </svg>
            </span>
            <span aria-hidden="true" className={`whitespace-nowrap overflow-hidden text-base transition-all duration-500 ${isActive ? "max-w-xs opacity-100 mx-2" : "max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-xs group-hover:mx-2 group-focus-visible:opacity-100 group-focus-visible:max-w-xs group-focus-visible:mx-2"}`}>
                {children}
            </span>
        </button>
    );
}