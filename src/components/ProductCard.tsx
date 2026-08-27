import React, { useState, type JSX } from "react";
import type { ProductDetails, CartDot } from "../types";
import { ButtonDesign, dollarFormatter } from "../constants";
import { Cart } from "../cartData.tsx";
import Modal from "./Modal.tsx";

export default function ProductCard({ imageURL, imageAlt, productCategory, productName, lipstickType, description, price, bgColor }: ProductDetails): JSX.Element {
    const [badges, setDots] = useState<CartDot[]>([]);
    const [wait, setWait] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const toggleModal = () => { setOpenModal(!openModal) }
    const [amount, setAmount] = useState(1);
    const increment = () => { setAmount(() => amount + 1) }
    const decrement = () => { setAmount(() => Math.max(1, amount - 1)) }
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
        <>
            <div className={`flex px-3 flex-col justify-start items-center text-center lg:min-w-[20dvw] lg:max-w-[22dvw] md:min-w-[29dvw] md:max-w-[32.5dvw] min-w-[42dvw] max-w-[48dvw] ${bgColor}`}>
                <span onClick={toggleModal} className="cursor-pointer w-full h-full">
                    <div className="w-full aspect-3/4 md:p-0 p-5 flex justify-center align-top">
                        <img src={imageURL} alt={imageAlt} className="object-cover object-center md:w-[67%] w-[90%]" />
                    </div>
                    <h4 className='md:text-nowrap text-wrap xl:text-4xl text-3xl md:mt-4 mt-1 px-6.5 font-thin font-[OpenSans]'>{productName}</h4>
                    <h5 className="md:text-nowrap text-wrap lg:text-3xl text-2xl font-bold font-['Times_New_Roman',serif]">{productCategory.replaceAll('_', ' ')}</h5>
                    <p className="md:text-nowrap text-wrap text-2xl font-normal font-[OpenSans]">${price.toFixed(2)}</p>
                </span>
                <button type="button" className={`${ButtonDesign}`} disabled={wait} onClick={(e) => { addToCart(e, productCategory, productName, lipstickType, description, price, imageURL); clickTraffic() }}>Buy Now</button>
            </div>
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {badges.map((badge) => (
                    <div key={badge.id}
                        className="cart-float absolute size-10 bg-[#891402] shadow-md bg-no-repeat bg-cover bg-center"
                        style={{
                            backgroundImage: `url('${imageURL}')`,
                            left: `${badge.x}px`,
                            top: `${badge.y}px`,
                            ["--start-x" as never]: `${badge.x}px`,
                            ["--start-y" as never]: `${badge.y}px`,
                        }} />
                ))}
            </div>
            <Modal isOpen={openModal} toggleFunction={toggleModal}>
                <div className="w-full flex flex-row">
                    <div className="w-1/2">
                        <img src={imageURL} alt={`${productCategory} - ${productName}`} className="p-3.5 object-cover w-full" />
                    </div>
                    <div className="w-1/2 p-3.5 flex flex-col items-start justify-start">
                        <h1 className="text-4xl font-normal font-['Times_New_Roman',serif]">{productName}</h1>
                        <h2 className="text-2xl mt-2 font-thin font-[OpenSans]">{productCategory}</h2>
                        <h3 className="text-2xl mt-2 font-normal font-['Times_New_Roman',serif]">{dollarFormatter(price)}</h3>
                        <div className="w-fit flex flex-row align-top border border-black justify-start mt-2 text-black">
                            <button className="h-7.5 font-extrabold border-r w-10 text-xl cursor-pointer" onClick={decrement}>-</button>
                            <span className="flex items-center justify-center text-md font-semibold w-10 text-center">{amount}</span>
                            <button className="h-7.5 font-extrabold border-l w-10 text-xl cursor-pointer" onClick={increment}>+</button>
                        </div>
                        <button type="button" className={`${ButtonDesign} text-lg!`} disabled={wait} onClick={buyFunction}>Buy Now</button>
                    </div>
                </div>
                <div className="w-full overflow-y-scroll">
                    <p className="text-md font-[OpenSans]">{description}</p>
                </div>
            </Modal>
        </>

    )
}