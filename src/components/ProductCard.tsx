import React, { useId, useState, type JSX } from "react";
import { createPortal } from "react-dom";
import type { ProductDetails, CartDot } from "../types";
import { ButtonDesign, dollarFormatter, formatCategory } from "../constants";
import { Cart } from "../cartData.tsx";
import Modal from "./Modal.tsx";
import LazyImage from "./LazyImage.tsx";
import QuantityStepper from "./QuantityStepper.tsx";

export default function ProductCard({ imageURL, imageAlt, productCategory, productName, lipstickType, description, price, bgColor }: ProductDetails): JSX.Element {
    const titleId = useId();
    const category = formatCategory(productCategory);
    const [badges, setDots] = useState<CartDot[]>([]);
    const [wait, setWait] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const toggleModal = () => { setOpenModal((isOpen) => !isOpen) }
    const [amount, setAmount] = useState(1);
    const increment = () => { setAmount((current) => current + 1) }
    const decrement = () => { setAmount((current) => Math.max(1, current - 1)) }
    const addToCart = async (e: React.MouseEvent<HTMLButtonElement>, category: string, productName: string, lipstickType: string, description: string, price: number, imageURL: string, quantity: number = 1) => {
        const startX = e.clientX;
        const startY = e.clientY;
        const badgeId = Date.now();

        setDots((prev: CartDot[]) => [...prev, { id: badgeId, x: startX, y: startY }]);

        await Cart.add(category, { name: productName, price: price, lipstickType: lipstickType, description: description, photoUrl: imageURL }, quantity);

        setTimeout(() => {
            setDots((prev: CartDot[]) => prev.filter((d) => d.id !== badgeId));
        }, 1000);
    };
    const clickTraffic = async () => {
        setWait(true);
        await new Promise<null>((res) => { setTimeout(res, 1200) });
        setWait(false);
    }
    const buyFunction = (e: React.MouseEvent<HTMLButtonElement>) => {
        addToCart(e, productCategory, productName, lipstickType, description, price, imageURL, amount);
        clickTraffic();
        toggleModal();
        setAmount(1);
    }
    return (
        <article className={`flex px-3 pt-4 flex-col justify-start items-center text-center w-full mx-auto lg:min-w-[20dvw] lg:max-w-[22dvw] md:min-w-[29dvw] md:max-w-[32.5dvw] min-w-[42dvw] max-w-[48dvw] ${bgColor}`}>
            <button type="button" onClick={toggleModal} aria-haspopup="dialog" className="group cursor-pointer w-full flex flex-col items-center">
                <span className="w-full md:p-0 p-5 flex justify-center items-start overflow-hidden">
                    <LazyImage src={imageURL} alt={imageAlt} width={247} height={330}
                        className="aspect-3/4 object-cover object-center md:w-[67%] w-[90%] transition-transform duration-500 group-hover:scale-[1.03]" />
                </span>
                <span className='block w-full wrap-break-word xl:text-4xl sm:text-3xl text-2xl md:mt-4 mt-1 px-2 font-thin font-sans transition-colors group-hover:text-beau'>{productName}</span>
                <span className="block w-full text-balance lg:text-2xl xl:text-3xl text-xl font-bold font-serif">{category}</span>
                <span className="block sm:text-2xl text-xl font-normal font-sans">{dollarFormatter(price)}</span>
                <span className="sr-only">, view details</span>
            </button>
            <div className="mt-auto">
                <button type="button" className={ButtonDesign} disabled={wait} aria-label={`Add ${productName} to cart`}
                    onClick={(e) => { addToCart(e, productCategory, productName, lipstickType, description, price, imageURL); clickTraffic() }}>
                    {wait ? "Added ✓" : "Buy Now"}
                </button>
            </div>
            <span role="status" className="sr-only">{wait ? `${productName} added to cart` : ""}</span>

            {badges.length > 0 && createPortal(
                <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
                    {badges.map((badge) => (
                        <div key={badge.id}
                            className="cart-float absolute size-10 bg-beau shadow-md bg-no-repeat bg-cover bg-center"
                            style={{
                                backgroundImage: `url('${imageURL}')`,
                                left: `${badge.x}px`,
                                top: `${badge.y}px`,
                                ["--start-x" as never]: `${badge.x}px`,
                                ["--start-y" as never]: `${badge.y}px`,
                            }} />
                    ))}
                </div>,
                document.body
            )}

            <Modal isOpen={openModal} toggleFunction={toggleModal} labelledBy={titleId}>
                <div className="w-full flex flex-row text-start">
                    <div className="w-1/2">
                        <LazyImage eager src={imageURL} alt={`${category} – ${productName}`} width={247} height={330} className="sm:p-3.5 p-2 aspect-3/4 object-cover w-full" />
                    </div>
                    <div className="w-1/2 sm:p-3.5 p-2 pe-8 flex flex-col items-start justify-start">
                        <h2 id={titleId} className="sm:text-4xl text-3xl font-normal font-serif wrap-break-word">{productName}</h2>
                        <p className="sm:text-2xl text-xl mt-2 font-thin font-sans">{category}</p>
                        <p className="text-xs mt-1 uppercase tracking-widest font-semibold text-neutral-600 font-sans">{lipstickType}</p>
                        <p className="sm:text-2xl text-xl mt-2 font-normal font-serif">{dollarFormatter(price)}</p>
                        <QuantityStepper value={amount} onDecrement={decrement} onIncrement={increment} itemLabel={productName} />
                        <button type="button" className={`${ButtonDesign} text-lg! w-full sm:w-fit`} disabled={wait} onClick={buyFunction}>Buy Now</button>
                    </div>
                </div>
                <div className="w-full min-h-0 flex-1 overflow-y-auto border-t border-black/10 pt-3 sm:px-3.5 px-2">
                    <p className="text-base leading-relaxed font-sans whitespace-pre-line text-neutral-800">{description}</p>
                </div>
            </Modal>
        </article>
    )
}
