import { type JSX } from "react";

/** Placeholder matching the ProductCard silhouette. */
export default function ProductCardSkeleton({ className = "flex" }: { className?: string }): JSX.Element {
    return (
        <div aria-hidden="true" className={`${className} flex-col items-center gap-3 px-3 pt-4`}>
            <div className="skeleton aspect-3/4 md:w-[67%] w-[90%]" />
            <div className="skeleton h-8 w-2/3 mt-2" />
            <div className="skeleton h-6 w-1/2" />
            <div className="skeleton h-6 w-1/3" />
            <div className="skeleton h-10 w-28 my-5" />
        </div>
    );
}
