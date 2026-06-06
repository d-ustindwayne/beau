import { useState, useEffect } from "react"
import type { CartList, ProductData, sortType } from "./types"
import sortArray from './constants'

const LOCAL_STORAGE_KEY = "shopping_cart_data";

function getInitialCart(): CartList {
    try {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : [];
    } catch {
        return [];
    }
}

let internalCart: CartList = getInitialCart()
let activeReactSetters: Array<(cart: CartList) => void> = [];

async function updateCart(newCart: CartList) {
    internalCart = newCart;

    activeReactSetters.forEach((setCart) => {
        try {
            setCart(newCart);
        } catch (e) {
            console.error("Failed to update a component instance:", e);
        }
    });

    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCart));
    } catch (error) {
        console.error("Failed to write to local storage:", error);
    }
}

export const Cart = {
    get CartList(): CartList {
        return internalCart;
    },

    async add(category: string, productToAdd: ProductData, quantity: number = 1) {
        if (quantity <= 0) return;

        const itemInCart = internalCart.find(
            (item) => item.category === category && item.product.name === productToAdd.name
        );

        let nextCart: CartList;
        if (itemInCart) {
            nextCart = internalCart.map((item) =>
                item.category === category && item.product.name === productToAdd.name
                    ? { ...item, amount: item.amount + quantity }
                    : item
            );
        } else {
            nextCart = [...internalCart, { category, amount: quantity, product: productToAdd }];
        }

        await updateCart(nextCart);
    },

    async remove(category: string, productName: string, removeAll: boolean = false) {
        const itemInCart = internalCart.find(
            (item) => item.category === category && item.product.name === productName
        );

        if (!itemInCart) return;

        let nextCart: CartList;

        if (removeAll || itemInCart.amount <= 1) {
            nextCart = internalCart.filter(
                (item) => !(item.category === category && item.product.name === productName)
            );
        } else {
            nextCart = internalCart.map((item) =>
                item.category === category && item.product.name === productName
                ? { ...item, amount: item.amount - 1 } : item
            );
        }

        await updateCart(nextCart);
    },

    getSubtotal(currentCart: CartList): number {
        return currentCart.reduce(
            (sum, item) => sum + item.product.price * item.amount,
            0
        );
    },

    getCount(currentCart: CartList): number {
        let count = 0;
        currentCart.map((i) => count += i.amount);
        return count;
    }
};

export function useCartList(sortBy?: sortType): CartList {
    const [cart, setCart] = useState<CartList>(() => [...internalCart]);

    useEffect(() => {
        activeReactSetters.push(setCart);

        return () => {
            activeReactSetters = activeReactSetters.filter((setter) => setter !== setCart);
        };
    }, []);

    const sortedCart = [...cart];
    if (sortBy) { sortArray(sortedCart, sortBy) }

    return sortedCart;
}