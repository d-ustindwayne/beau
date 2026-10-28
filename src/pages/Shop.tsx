import { useState, useRef, type JSX } from "react";
import { Link, useSearchParams } from "react-router-dom";
import sortArray, { ButtonDesign, formatCategory, getProducts, randomize } from "../constants";
import productList from "../productList.json";
import type { ProductList, sortType, lipType } from "../types";
import { SortButton } from "../components/SortButton";
import Pagination from "../components/Pagination";
import glossyType from "/assets/finishes/glossy.webp";
import matteType from "/assets/finishes/matte.webp";
import satinType from "/assets/finishes/satin.webp";

const PAGE_SIZE: number = 12;
const loadedData: ProductList = productList;
const allProducts: JSX.Element[] = Object.keys(loadedData).flatMap((category) => getProducts(loadedData, category));

const collections: string[] = Object.keys(loadedData);

const lipTypes: Array<{ type: Exclude<lipType, "all">, image: string }> = [
    { type: "Glossy", image: glossyType },
    { type: "Matte", image: matteType },
    { type: "Satin", image: satinType },
];

/** URL value for each sort option, e.g. /shop?sort=price-desc. Every sort and filter is kept in the URL so views can be shared and the back button works. */
const SORT_PARAMS: Record<string, { sort: sortType, isAsc: boolean }> = {
    "featured": { sort: "random", isAsc: true },
    "name": { sort: "alphabet", isAsc: true },
    "name-desc": { sort: "alphabet", isAsc: false },
    "price": { sort: "price", isAsc: true },
    "price-desc": { sort: "price", isAsc: false },
    "newest": { sort: "latest", isAsc: false },
    "oldest": { sort: "latest", isAsc: true },
};

const toSortParam = (sort: sortType, isAsc: boolean): string =>
    Object.entries(SORT_PARAMS).find(([, v]) => v.sort === sort && v.isAsc === isAsc)?.[0] ?? "featured";

/** "Winter_Garden" <-> "winter-garden" */
const slugify = (value: string): string => value.toLowerCase().replace(/[_\s]+/g, "-");

export default function Shop(): JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams();
    const { sort, isAsc } = SORT_PARAMS[searchParams.get("sort") ?? "featured"] ?? SORT_PARAMS.featured;
    const type: lipType = lipTypes.find((l) => l.type.toLowerCase() === searchParams.get("finish")?.toLowerCase())?.type ?? "all";
    // "collection" is still accepted so older links keep working.
    const collectionParam = searchParams.get("collections") ?? searchParams.get("collection");
    const collection: string = collections.find((c) => collectionParam && slugify(c) === slugify(collectionParam)) ?? "all";
    const page = Math.max(1, Number(searchParams.get("page")) || 1);
    // Shuffled once per visit so the "random" order stays stable across re-renders and pages.
    const [shuffledProducts] = useState(() => randomize([...allProducts]));
    const listTopRef = useRef<HTMLDivElement>(null);

    /** Writes the next view to the URL, dropping defaults so links stay short. Filter changes reset to page 1. */
    const updateView = (next: { sort?: sortType, isAsc?: boolean, type?: lipType, collection?: string, page?: number }) => {
        const nextSort = next.sort ?? sort;
        const nextAsc = next.isAsc ?? isAsc;
        const nextType = next.type ?? type;
        const nextCollection = next.collection ?? collection;
        const nextPage = next.page ?? 1;
        const params = new URLSearchParams();
        if (nextCollection !== "all") params.set("collections", slugify(nextCollection));
        if (nextType !== "all") params.set("finish", nextType.toLowerCase());
        params.set("sort", toSortParam(nextSort, nextAsc));
        if (nextPage > 1) params.set("page", String(nextPage));
        setSearchParams(params, { replace: true, preventScrollReset: true });
    }

    const changeType = (typeI: lipType) => updateView({ type: typeI === type ? "all" : typeI });

    const changeCollection = (next: string) => updateView({ collection: next });

    const changeSort = (sortI: sortType) => {
        if (sortI === sort) updateView({ isAsc: sortI === "random" ? true : !isAsc });
        // "Date added" starts with the newest products, which is what shoppers usually want first.
        else updateView({ sort: sortI, isAsc: sortI !== "latest" });
    }

    const clearFilters = () => updateView({ type: "all", collection: "all" });

    const base = sort === "random" ? shuffledProducts : allProducts;
    const matchingProducts = base.filter((product) =>
        (type === "all" || product.props.lipstickType === type) &&
        (collection === "all" || product.props.productCategory === collection));
    const filteredAndSortedProducts = sort === "random" ? matchingProducts : sortArray(matchingProducts, sort, isAsc);
    const hasFilters = type !== "all" || collection !== "all";

    const totalProducts = filteredAndSortedProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const currentProductsView = filteredAndSortedProducts.slice(start, start + PAGE_SIZE);

    const goToPage = (nextPage: number): void => {
        updateView({ page: nextPage });
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        listTopRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }

    return (<>
        <title>Shop | beau</title>
        <section className="flex md:flex-row flex-col items-center font-serif">
            <div className="md:w-1/3 w-full">
                <h1 className="md:px-14 md:pt-14 px-6 pt-10 pb-2 xl:text-7xl lg:text-6xl text-5xl md:text-start text-center italic">Choose your look</h1>
                <p className="md:px-14 px-6 md:pb-14 font-sans text-base md:text-start text-center text-neutral-700">
                    Unsure? <Link to="/shade-finder" className="font-semibold text-beau underline underline-offset-4 decoration-beau/40 hover:decoration-beau">Take the Shade Finder</Link>
                </p>
            </div>
            <div role="group" aria-label="Filter by finish" className="md:w-2/3 w-full flex flex-row justify-evenly sm:gap-4 gap-2 md:py-10 py-6 sm:mr-10.5 mr-0 md:px-0 px-3">
                {lipTypes.map(({ type: lip, image }) => {
                    const isSelected = type === lip;
                    return (
                        <button key={lip} type="button" onClick={() => changeType(lip)} aria-pressed={isSelected}
                            className="group flex flex-col items-center sm:px-3.5 px-1 rounded-full focus-visible:outline-offset-8">
                            <span className="lg:w-45 md:w-32.5 sm:w-30.5 w-24 rounded-full aspect-square flex justify-center items-center">
                                <img src={image} alt="" width={180} height={180} loading="lazy" decoding="async"
                                    className={`w-full h-full object-cover rounded-full animate-spin [animation-duration:25s] transition-shadow duration-300 ${isSelected? 'ring-8 md:ring-12 ring-[#e37d72]' : 'ring-0 group-hover:ring-4 group-hover:ring-[#e37d72]/50'}`}/>
                            </span>
                            <span className={`my-4 md:text-3xl text-xl transition-colors ${isSelected ? "text-beau" : ""}`}>{lip}</span>
                        </button>
                    );
                })}
            </div>
        </section>

        <div ref={listTopRef} className="scroll-mt-4 mx-4 md:mx-5 flex flex-col gap-4 border-y border-beau/15 py-5">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <p id="sort-label" className="font-serif text-2xl italic sm:w-32">Sort by</p>
                <div role="group" aria-labelledby="sort-label" className="flex items-center gap-1 p-1 rounded-full bg-sand max-w-full overflow-x-auto [scrollbar-width:none]">
                    <SortButton sortBy="random" sortFunction={changeSort} currentSort={sort} isAsc={isAsc}>Featured</SortButton>
                    <SortButton sortBy="alphabet" sortFunction={changeSort} currentSort={sort} isAsc={isAsc}>Name</SortButton>
                    <SortButton sortBy="price" sortFunction={changeSort} currentSort={sort} isAsc={isAsc}>Price</SortButton>
                    <SortButton sortBy="latest" sortFunction={changeSort} currentSort={sort} isAsc={isAsc}>Date Added</SortButton>
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <p id="collection-label" className="font-serif text-2xl italic sm:w-32">Collection</p>
                <div role="group" aria-labelledby="collection-label" className="flex gap-2 overflow-x-auto max-sm:w-full max-sm:-mx-4 max-sm:px-4 pb-1 -mb-1 [scrollbar-width:none]">
                    {["all", ...collections].map((c) => {
                        const isSelected = collection === c;
                        return (
                            <button key={c} type="button" aria-pressed={isSelected} onClick={() => changeCollection(c)}
                                className={`shrink-0 h-9 px-4 rounded-full border font-sans text-sm transition-colors duration-200 ${
                                    isSelected ? "bg-black border-black text-white" : "border-black/25 bg-white/60 hover:border-black hover:bg-white"
                                }`}>
                                {c === "all" ? "All" : formatCategory(c)}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-neutral-700">
                <p aria-live="polite">
                    {totalProducts === 0
                        ? "No products found"
                        : `Showing ${start + 1}–${start + currentProductsView.length} of ${totalProducts} products`}
                    {type !== "all" && <> in <span className="font-semibold text-beau">{type}</span></>}
                    {collection !== "all" && <> from <span className="font-semibold text-beau">{formatCategory(collection)}</span></>}
                </p>
                {hasFilters && (
                    <button type="button" onClick={clearFilters} className="text-sm font-semibold text-beau underline underline-offset-4 decoration-beau/40 hover:decoration-beau">
                        Clear filters
                    </button>
                )}
            </div>
        </div>

        {totalProducts === 0 && (
            <div className="flex flex-col items-center text-center px-6 py-16 animate-fade-in">
                <p className="font-serif italic text-3xl">No shades match these filters</p>
                <p className="font-sans text-neutral-700 mt-2">Try another finish or collection.</p>
                <button type="button" onClick={clearFilters} className={`${ButtonDesign} text-base!`}>Clear filters</button>
            </div>
        )}

        <div key={`${sort}-${isAsc}-${type}-${collection}-${currentPage}`} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-5 md:py-7.5 animate-fade-in">
            {currentProductsView}
        </div>

        <div className="flex flex-col items-center gap-3 lg:mt-6 md:mt-4 mt-2 lg:mb-12 md:mb-10 mb-8 px-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} label="Product pages" />
            {totalPages > 1 && <p className="text-sm text-neutral-600">Page {currentPage} of {totalPages}</p>}
        </div>
    </>)
}
