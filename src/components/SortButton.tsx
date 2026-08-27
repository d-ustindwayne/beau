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
                <text x="7" y="20" textAnchor="middle" fontSize="20" fontWeight="600" fill="currentColor" stroke="none">$</text>;
                <path d={isActive && isAsc ? "M14 14l3.5 3.5 3.5-3.5M17.5 6.5v11" : "M14 10l3.5-3.5 3.5 3.5M17.5 6.5v11"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </>
            default:
                return null;
        }
    };

    return (
        <button className={`group flex items-center ms-3 p-2 cursor-pointer rounded-lg w-fit min-w-15 h-15 transition-colors ${isActive ? 'bg-[#841910] text-white' : 'bg-[#eed8a4] text-black'}`} onClick={() => sortFunction(sortBy)}>
            <span className="group-hover:max-w-xs ms-2 w-8.5 h-8.5 flex justify-center items-center">
                <svg viewBox="0 0 24 24" className={`w-8.5 h-8.5 ${isActive ? 'text-white' : 'text-black'}`}>
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        {renderIcon()}
                    </g>
                </svg>
            </span>
            <span className="max-w-0 whitespace-nowrap overflow-hidden text-md transition-all opacity-0 group-hover:opacity-100 duration-500 group-hover:max-w-xs group-hover:mx-3">
                {children}
            </span>
        </button>
    );
}