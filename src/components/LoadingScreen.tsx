import { type JSX } from "react"
import ProductCardSkeleton from "./ProductCardSkeleton";

/** Route-level placeholder shown while a page chunk loads. */
export default function LoadingScreen(): JSX.Element {
    return (
        <div role="status" aria-busy="true" className="animate-fade-in">
            <span className="sr-only">Loading page…</span>
            <div aria-hidden="true" className="skeleton w-full md:min-h-[36dvh] sm:min-h-[28dvh] min-h-[24dvh]" />
            <div aria-hidden="true" className="flex flex-col items-center pt-10 pb-12">
                <div className="skeleton h-12 md:w-md w-3/4 mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 w-full max-w-7xl">
                    <ProductCardSkeleton />
                    <ProductCardSkeleton />
                    <ProductCardSkeleton className="hidden md:flex" />
                    <ProductCardSkeleton className="hidden lg:flex" />
                </div>
            </div>
        </div>
    );
}
