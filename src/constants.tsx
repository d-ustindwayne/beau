/* eslint-disable @typescript-eslint/no-explicit-any */
import { type JSX } from "react"
import ProductCard from "./components/ProductCard"
import type { breakpoints as bp, ProductList, sortType } from "./types"

export const SplideClass: object = {
    arrows: 'splide__arrows',
    arrow: 'splide__arrow [&_svg]:fill-white! !bg-transparent !p-2 scale-150 md:scale-200',
    prev: 'splide__arrow--prev sm:!left-10 !left-7',
    next: 'splide__arrow--next sm:!right-10 !right-7',
    pagination: 'splide__pagination gap-2',
}

export const breakpoints: Record<bp, number> = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536
};
export const deviceWidth: number = window.innerWidth;
export const ButtonDesign: string = "cursor-pointer w-fit inline lg:text-2xl md:text-xl sm:text-xl text-md font-semibold sm:px-7 px-4 py-2 bg-[#841910] text-white my-5 uppercase"
export const AnchorDesign: string = "transition-all ease-in-out relative font-medium text-[#841910] lg:text-xl md:text-lg text-md after:absolute after:bottom-0 after:left-0 md:after:h-0.75 after:h-0.5 after:w-0 after:bg-[#841910] after:transition-all after:duration-300 hover:after:w-full cursor-pointer"

export const dollarFormatter = (value: number): string => new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
}).format(value);

export default function sortArray<T>(array: T[], sortBy: sortType, isAsc: boolean = true): T[] {  
    const getString = (item: any) => {
        const target = item?.props || item;
        if (!target) return "";
        return String(target.productName || target.product?.name || target.name || "");
    }

    const getNumber = (item: any, specify: string) => {
        const target = item?.props || item;
        if (!target) return 0;
        
        switch(specify) {
            case "price":
                return target.price || target.product?.price || 0;
            case "amount":
                return target.amount || 0;
            default:
                return 0;
        }
    }

    switch (sortBy) {
        case "alphabet":
            array.sort((a, b) => {
                const res = getString(a).localeCompare(getString(b));
                return isAsc ? res : -res;
            });
            break;
        case "amount":
            array.sort((a, b) => {
                const valA = getNumber(a, "amount");
                const valB = getNumber(b, "amount");
                return isAsc ? valA - valB : valB - valA;
            });
            break;
        case "price":
            array.sort((a, b) => {
                const valA = getNumber(a, "price");
                const valB = getNumber(b, "price");
                return isAsc ? valA - valB : valB - valA;
            });
            break;
        case "latest":
            if (!isAsc) array.reverse();
            break;
        default:
            randomize(array as JSX.Element[]); 
            break;
    }
    return array;
}
export function randomize(array: JSX.Element[]): JSX.Element[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function getProducts(
    productList: ProductList,
    category: string,
    random: boolean = false,
    count?: number,
    bgColor?: string
): Array<JSX.Element> {
    const baseUrl = import.meta.env.BASE_URL;
    const productCategory = productList[category];
    let products: JSX.Element[] = Object.values(productCategory).map((product) =>
        <ProductCard key={`${category}-${product.name}`}
            productCategory={category} productName={product.name}
            lipstickType={product.lipstickType} description={product.description}
            price={product.price} bgColor={bgColor || "bg-transparent"}
            imageURL={`${baseUrl}${product.photoUrl}`} imageAlt={`${category}-${product.name}`} />
    )
    if (random) products = randomize(products);
    if (count) products = products.slice(0, count);
    return products;
}