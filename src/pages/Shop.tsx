import { useState, useMemo, useRef, type JSX } from "react";
import { useSearchParams } from "react-router-dom";
import sortArray, { getProducts, randomize } from "../constants";
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

const lipTypes: Array<{ type: Exclude<lipType, "all">, image: string }> = [
    { type: "Glossy", image: glossyType },
    { type: "Matte", image: matteType },
    { type: "Satin", image: satinType },
];

export default function Shop(): JSX.Element {
    const [sort, setSort] = useState("random" as sortType);
    const [isAsc, setIsAsc] = useState(true);
    const [searchParams] = useSearchParams();
    // Allows deep links such as /shop?finish=Matte (used by Jinny).
    const [type, setType] = useState<lipType>(() => lipTypes.find((l) => l.type.toLowerCase() === searchParams.get("finish")?.toLowerCase())?.type ?? "all");
    const [page, setPage] = useState(1);
    // Shuffled once per visit so the "random" order stays stable across re-renders and pages.
    const [shuffledProducts] = useState(() => randomize([...allProducts]));
    const listTopRef = useRef<HTMLDivElement>(null);

    const changeType = (typeI: lipType) => {
        setType(() => typeI == type? "all" : typeI);
        setPage(1);
    }

    const changeSort = (sortI: sortType) => {
        if (sortI === sort) {
            setIsAsc(!isAsc);
        } else {
            setSort(sortI);
            setIsAsc(true);
        }
        setPage(1);
    }

    const filteredAndSortedProducts = useMemo(() => {
        const base = sort === "random" ? shuffledProducts : allProducts;
        const productsToProcess = type === "all" ? [...base] : base.filter(product => product.props.lipstickType === type);
        return sort === "random" ? productsToProcess : sortArray(productsToProcess, sort, isAsc);
    }, [shuffledProducts, sort, isAsc, type]);

    const totalProducts = filteredAndSortedProducts.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const start = (currentPage - 1) * PAGE_SIZE;
    const currentProductsView = filteredAndSortedProducts.slice(start, start + PAGE_SIZE);

    const goToPage = (nextPage: number): void => {
        setPage(nextPage);
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        listTopRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    }

    return (<>
        <title>Shop | beau</title>
        <section className="flex md:flex-row flex-col items-center font-serif">
            <div className="md:w-1/3 w-full">
                <h1 className="md:p-14 px-6 pt-10 pb-2 xl:text-7xl lg:text-6xl text-5xl md:text-start text-center italic">Choose your look</h1>
            </div>
            <div role="group" aria-label="Filter by finish" className="md:w-2/3 w-full flex flex-row justify-evenly sm:gap-4 gap-2 md:py-10 py-6 sm:mr-10.5 mr-0 md:px-0 px-3">
                {lipTypes.map(({ type: lip, image }) => {
                    const isSelected = type === lip;
                    return (
                        <button key={lip} type="button" onClick={() => changeType(lip)} aria-pressed={isSelected}
                            className="group flex flex-col items-center sm:px-3.5 px-1 rounded-full focus-visible:outline-offset-8">
                            <span className="lg:w-45 md:w-32.5 sm:w-30.5 w-24 rounded-full aspect-square flex justify-center items-center">
                                <img src={image} alt="" width={180} height={180} loading="lazy" decoding="async"
                                    className={`w-full h-full object-cover rounded-full motion-safe:animate-spin [animation-duration:25s] transition-shadow duration-300 ${isSelected? 'ring-8 md:ring-12 ring-[#e37d72]' : 'ring-0 group-hover:ring-4 group-hover:ring-[#e37d72]/50'}`}/>
                            </span>
                            <span className={`my-4 md:text-3xl text-xl transition-colors ${isSelected ? "text-beau" : ""}`}>{lip}</span>
                        </button>
                    );
                })}
            </div>
        </section>

        <div ref={listTopRef} className="scroll-mt-4 flex flex-row flex-wrap items-center gap-3 mx-5">
            <p className="font-bold text-2xl me-1">Sort by:</p>
            <SortButton sortBy="alphabet" sortFunction={changeSort} currentSort={sort} isAsc={isAsc}>Name</SortButton>
            <SortButton sortBy="price" sortFunction={changeSort} currentSort={sort} isAsc={isAsc}>Price</SortButton>
            <SortButton sortBy="latest" sortFunction={changeSort} currentSort={sort} isAsc={isAsc}>Date Added</SortButton>
            <p aria-live="polite" className="w-full sm:w-auto sm:ms-auto text-base text-neutral-700">
                {totalProducts === 0
                    ? "No products found"
                    : `Showing ${start + 1}–${start + currentProductsView.length} of ${totalProducts} products`}
                {type !== "all" && <> in <span className="font-semibold text-beau">{type}</span></>}
            </p>
        </div>

        <div key={`${sort}-${isAsc}-${type}-${currentPage}`} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-5 md:py-7.5 animate-fade-in">
            {currentProductsView}
        </div>

        <div className="flex flex-col items-center gap-3 lg:mt-6 md:mt-4 mt-2 lg:mb-12 md:mb-10 mb-8 px-4">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} label="Product pages" />
            {totalPages > 1 && <p className="text-sm text-neutral-600">Page {currentPage} of {totalPages}</p>}
        </div>
    </>)
}
