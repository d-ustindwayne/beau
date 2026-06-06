import type { PropsWithChildren, ReactNode } from "react"

export interface ProductDetails {
    imageURL: string,
    imageAlt: string,
    productCategory: string,
    productName: string,
    lipstickType: string,
    description: string,
    price: number,
    bgColor: string,
}

export interface AffiliateDetails {
    name: string,
    insta: string,
    photoUrl: string
}

export type CartList = Array<CartItem>;
export interface CartItem {
    category: string,
    amount: number,
    product: ProductData
}

export type breakpoints = "sm" | "md" | "lg" | "xl" | "2xl";

export type ProductList = Record<string, Array<ProductData>>;

export interface ModalProps extends PropsWithChildren {
    children: ReactNode,
    isOpen: boolean,
    toggleFunction: () => void
}

export interface CartDot {
    id: number;
    x: number;
    y: number;
}

export interface ProductData {
    name: string,
    price: number,
    lipstickType: string,
    description: string,
    photoUrl: string
}

export type lipType = "all" | "Glossy" | "Matte" | "Satin"

export type sortType = "alphabet" | "price" | "latest" | "amount" | "random";

export interface Props {
    mediaType?: 'photo' | 'image' | 'video' | undefined,
    mediaURL: string,
    mediaAlt?: string,
    mediaPadding?: string,
    title: string,
    subtitle?: string
    description?: string
    hasButton?: boolean,
    buttonContent?: string,
    buttonClass?: string,
    textColor?: string,
    bgColor?: string,
    alignment?: "items-center" | "items-start" | "items-end",
    direction?: 'pnt' | 'tnp',
    font?: string,
    ratio?: string,
    phoneHideMedia?: boolean,
}
