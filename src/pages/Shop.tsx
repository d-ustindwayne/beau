import { useState, useMemo, type JSX } from "react";
import sortArray, { AnchorDesign, getProducts } from "../constants";
import productList from "../productList.json";
import type { ProductList, sortType, lipType } from "../types";
import { SortButton } from "../components/SortButton";
import glossyType from "/Glossy.png";
import matteType from "/Matte.png";
import satinType from "/Satin.png";

export default function Shop(): JSX.Element {
    const [sort, setSort] = useState("random" as sortType); 
    const [isAsc, setIsAsc] = useState(true);
    const [type, setType] = useState("all" as lipType);
    const changeType = (typeI: lipType) => {setType(() => typeI == type? "all" : typeI)}
    const loadedData: ProductList = productList;

    const changeSort = (sortI: sortType) => {
        if (sortI === sort) {
            setIsAsc(!isAsc);
        } else {
            setSort(sortI);
            setIsAsc(true);
        }
    }

    const ProductCategories: string[] = Object.keys(loadedData);
    const loadProd: JSX.Element[] = ProductCategories.map((item) => getProducts(loadedData, item)).flat();
    
    const filteredAndSortedProducts = useMemo(() => {
        let productsToProcess = [...loadProd];
        if (type !== "all") {
            productsToProcess = productsToProcess.filter(product => product.props.lipstickType === type);
        }
        return sortArray(productsToProcess, sort, isAsc);
    }, [loadProd, sort, isAsc, type]);
    
    const BATCH_SIZE: number = 12;
    const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
    const currentProductsView = filteredAndSortedProducts.slice(0, visibleCount);
    const loadMore = (): void => { setVisibleCount(count => count + BATCH_SIZE); }
    return (<>
        <section className="flex md:flex-row flex-col font-[\'Times_New_Roman\',serif]">
            <div className="md:w-1/3 w-full">
                <p className="p-14 xl:text-7xl lg:text-6xl text-5xl md:text-start text-center italic">Choose your look</p>
            </div>
            <div className="md:w-2/3 w-full flex flex-row justify-evenly gap-4 py-10 sm:mr-10.5 mr-0 md:px-0 px-4">
                <div className="flex flex-col items-center px-3.5" onClick={() => changeType("Glossy")}>
                    <div className="max-w-45 min-w-30.5 lg:w-45 md:w-32.5 sm:30.5 rounded-full aspect-square flex justify-center items-center">
                        <img src={glossyType} alt="Type: Glossy" className={`w-full h-full object-cover rounded-full inset-0 animate-spin [animation-duration:25s] cursor-pointer ${type == "Glossy"? 'ring-12 ring-[#e37d72]' : 'filter-none ring-none'}`}/>
                    </div>
                    <div className="my-4 text-3xl">Glossy</div>
                </div>
                <div className="flex flex-col items-center px-3.5" onClick={() => changeType("Matte")}>
                    <div className="max-w-45 min-w-30.5 lg:w-45 md:w-32.5 sm:30.5 rounded-full aspect-square flex justify-center items-center">
                        <img src={matteType} alt="Type: Matte" className={`w-full h-full object-cover rounded-full inset-0 animate-spin [animation-duration:25s] cursor-pointer ${type == "Matte"? 'ring-12 ring-[#e37d72]' : 'filter-none ring-none'}`}/>
                    </div>
                    <div className="my-4 text-3xl">Matte</div>
                </div>
                <div className="flex flex-col items-center px-3.5" onClick={() => changeType("Satin")}>
                    <div className="max-w-45 min-w-30.5 lg:w-45 md:w-32.5 sm:30.5 rounded-full aspect-square flex justify-center items-center">
                        <img src={satinType} alt="Type: Satin" className={`w-full h-full object-cover rounded-full inset-0 animate-spin [animation-duration:25s] cursor-pointer ${type == "Satin"? 'ring-12 ring-[#e37d72]' : 'filter-none ring-none'}`}/>
                    </div>
                    <div className="my-4 text-3xl">Satin</div>
                </div>
            </div>
        </section>
        
        <section className="flex flex-row items-center mx-5">
            <p className="inline h-lh font-bold text-2xl">Sort by:</p>
            <SortButton sortBy="alphabet" sortFunction={changeSort} currentSort={sort} isAsc={isAsc}>Name</SortButton>
            <SortButton sortBy="price" sortFunction={changeSort} currentSort={sort} isAsc={isAsc}>Price</SortButton>
            <SortButton sortBy="latest" sortFunction={changeSort} currentSort={sort} isAsc={isAsc}>Date Added</SortButton>
        </section>

        <main className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 md:py-7.5">
            {currentProductsView}
            <div className="w-dvw flex justify-center lg:mt-12 md:mt-9 mt-6.5 md:mb-3 mb-5"> 
                {visibleCount < filteredAndSortedProducts.length? <span onClick={loadMore} className={AnchorDesign}>Load More</span> : <span>All {filteredAndSortedProducts.length} products loaded</span>}
            </div>
        </main>
    </>)
}