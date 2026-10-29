/* eslint-disable @typescript-eslint/no-explicit-any */
import { type JSX } from "react"
import ProductCard from "./components/ProductCard"
import type { breakpoints as bp, ProductList, sortType } from "./types"

export const SplideClass: object = {
    arrows: 'splide__arrows',
    arrow: 'splide__arrow [&_svg]:fill-white! !bg-transparent !p-2 scale-150 md:scale-200 !opacity-80 hover:!opacity-100 drop-shadow-[0_1px_3px_rgb(0_0_0/0.6)] transition-opacity',
    prev: 'splide__arrow--prev sm:!left-10 !left-7',
    next: 'splide__arrow--next sm:!right-10 !right-7',
    pagination: 'splide__pagination gap-2',
}

/** beau's mailboxes, one per purpose. Jinny's copy lives in jinny-worker/src/index.ts. */
export const EMAILS = {
    support: "support@beau.dustindwayn.ee",
    affiliates: "affiliates@beau.dustindwayn.ee",
    privacy: "privacy@beau.dustindwayn.ee",
} as const;

export const breakpoints: Record<bp, number> = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536
};
export const deviceWidth: number = window.innerWidth;
export const ButtonDesign: string = "cursor-pointer w-fit inline-block text-center lg:text-2xl md:text-xl sm:text-xl text-base font-semibold tracking-wide sm:px-7 px-4 py-2 bg-beau text-white my-5 uppercase transition-[background-color,transform,opacity] duration-200 hover:bg-beau-dark active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-beau disabled:active:scale-100"
export const AnchorDesign: string = "transition-all ease-in-out relative font-medium text-beau lg:text-xl md:text-lg text-base after:absolute after:bottom-0 after:left-0 md:after:h-0.75 after:h-0.5 after:w-0 after:bg-beau after:transition-all after:duration-300 hover:after:w-full focus-visible:after:w-full cursor-pointer"

export const FieldWrapper: string = "w-full relative border-2 border-beau bg-field transition-shadow duration-200 focus-within:shadow-[0_0_0_3px_rgb(132_25_16/0.18)]"
export const FieldControl: string = "peer block w-full px-2.5 pb-2.5 pt-5 text-sm text-black bg-transparent outline-0"
export const FieldLabel: string = "absolute text-sm text-neutral-600 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate max-w-[calc(100%-1.25rem)] pointer-events-none peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-beau"

const currencyFormat =new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
});
export const dollarFormatter = (value: number): string => currencyFormat.format(value);

export const formatCategory = (category: string): string => category.replaceAll('_', ' ');

/** NZ prices are GST-inclusive; this returns the GST portion of a GST-inclusive amount. */
export const gstFromInclusive = (value: number): number => value * 3 / 23;

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
            randomize(array);
            break;
    }
    return array;
}
export function randomize<T>(array: T[]): T[] {
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
    const productCategory = productList[category];
    let products: JSX.Element[] = Object.values(productCategory).map((product) =>
        <ProductCard key={`${category}-${product.name}`}
            productCategory={category} productName={product.name}
            lipstickType={product.lipstickType} description={product.description}
            price={product.price} bgColor={bgColor || "bg-transparent"}
            imageURL={product.photoUrl} imageAlt={`${product.name} lipstick from ${formatCategory(category)}`} />
    )
    if (random) products = randomize(products);
    if (count) products = products.slice(0, count);
    return products;
}