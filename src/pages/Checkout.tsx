import { Cart, useCartList } from "../cartData.tsx"
import { ButtonDesign, dollarFormatter } from "../constants"
import { type JSX } from "react"

export default function Checkout(): JSX.Element {
    const currentCart = useCartList("alphabet");
    const subtotal = Cart.getSubtotal(currentCart);
    const cartCount = Cart.getCount(currentCart);
    return (<div className="flex justify-center">
        <section className="md:max-w-full sm:max-w-[87.5dvw] max-w-full w-full flex flex-col md:flex-row justify-center md:border-x-none border-x-3 md:border-transparent border-x-[#841910]">
            <div className="md:w-1/2 w-full p-6.5 sm:flex flex-col md:border-r-[#841910] md:border-r">
                <h1 className="font-['Times_New_Roman',serif] font-semibold italic lg:text-6xl text-5xl my-2.5">Delivery</h1>
                <span className="flex bg-[#841910] lg:h-px md:h-0.5 sm:h-0.5 h-0.5 w-full my-4.5"></span>
                <form className="w-full">
                    <div className="w-full relative border-2 border-[#841910] md:my-5.5 my-3.5 bg-[#f8f9f6]">
                        <input id="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"  minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                        <label htmlFor="email" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Email</label>
                    </div>
                    <div className="flex justify-between md:my-5.5 my-3.5 gap-[6.75dvw]">
                        <div className="w-full relative border-2 border-[#841910] my-0! bg-[#f8f9f6]">
                            <input id="firstName" type="text" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                            <label htmlFor="firstName" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">First Name</label>
                        </div>
                        <div className="w-full relative border-2 border-[#841910] my-0! bg-[#f8f9f6]">
                            <input id="lastName" type="text" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                            <label htmlFor="lastName" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Last Name</label>
                        </div>
                    </div>
                    <div className="w-full relative border-2 border-[#841910] md:my-5.5 my-3.5 bg-[#f8f9f6]">
                        <input id="companyName" type="text" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                        <label htmlFor="companyName" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Company (Optional)</label>
                    </div>
                    <div className="w-full relative border-2 border-[#841910] md:my-5.5 my-3.5 bg-[#f8f9f6]">
                        <input id="addresssLine1" type="text" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                        <label htmlFor="addresssLine1" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Address</label>
                    </div>
                    <div className="w-full relative border-2 border-[#841910] md:my-5.5 my-3.5 bg-[#f8f9f6]">
                        <input id="addressLine2" type="text" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                        <label htmlFor="addressLine2" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Apartment, suite, etc. (Optional)</label>
                    </div>
                    <div className="flex justify-between md:my-5.5 my-3.5 gap-[2.75dvw]">
                        <div className="w-full relative border-2 border-[#841910] my-0! bg-[#f8f9f6]">
                            <input id="city" type="text" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                            <label htmlFor="city" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">City</label>
                        </div>
                        <div className="w-full relative border-2 border-[#841910] my-0! bg-[#f8f9f6]">
                            <input id="region" type="text" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                            <label htmlFor="region" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Region</label>
                        </div>
                        <div className="w-full relative border-2 border-[#841910] my-0! bg-[#f8f9f6]">
                            <input id="postCode" type="postCode" minLength={2} maxLength={8} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                            <label htmlFor="postCode" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Postal Code</label>
                        </div>
                    </div>
                    <div className="w-full relative border-2 border-[#841910] md:my-5.5 my-3.5 bg-[#f8f9f6]">
                        <input id="phoneNumber" type="tel" minLength={2} maxLength={20} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                        <label htmlFor="phoneNumber" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Phone</label>
                    </div>
                </form>
                <h1 className="font-['Times_New_Roman',serif] font-semibold italic lg:text-6xl text-5xl my-2.5">Payment</h1>
                <span className="flex bg-[#841910] lg:h-px md:h-0.5 sm:h-0.5 h-0.5 w-full my-4.5"></span>
                <form className="w-full">
                    <div className="w-full relative border-2 border-[#841910] md:my-5.5 my-3.5 bg-[#f8f9f6]">
                        <input id="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                        <label htmlFor="email" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Card Number</label>
                    </div>
                    <div className="flex justify-between md:my-5.5 my-3.5 gap-[6.75dvw]">
                        <div className="w-full relative border-2 border-[#841910] my-0! bg-[#f8f9f6]">
                            <input id="firstName" type="firstName" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                            <label htmlFor="firstName" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Expiration Date (MM/YY)</label>
                        </div>
                        <div className="w-full relative border-2 border-[#841910] my-0! bg-[#f8f9f6]">
                            <input id="lastName" type="lastName" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                            <label htmlFor="lastName" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Security Code</label>
                        </div>
                    </div>
                    <div className="w-full relative border-2 border-[#841910] md:my-5.5 my-3.5 bg-[#f8f9f6]">
                        <input id="companyName" type="companyName" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                        <label htmlFor="companyName" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 truncate
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Name on Card</label>
                    </div>
                </form>
            </div>
            <div className="md:w-1/2 w-full p-6.5 sm:flex flex-col md:border-l-[#841910] md:border-l">
                <h1 className="font-['Times_New_Roman',serif] font-semibold italic lg:text-6xl text-5xl my-2.5">Order Summary</h1>
                <span className="flex bg-[#841910] lg:h-px md:h-0.5 sm:h-0.5 h-0.5 w-full my-4.5"></span>
                <div className="flex flex-col">
                    {cartCount !== 0 ? (currentCart.map((item) => {
                        const itemKey = `${item.category}-${item.product.name}`;
                        return (
                            <div key={itemKey}
                                className="relative flex items-center gap-4 py-3 border-b border-white last:border-0 transition-all duration-300 ease-in-out origin-center">
                                <div className="md:w-20 md:h-32 w-16 h-20 rounded-lg shrink-0">
                                    <img className="w-full object-cover" src={item.product.photoUrl} />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-start items-start min-h-full">
                                    <p className="font-bold font-['Times_New_Roman',serif] text-xl">{item.product.name}</p>
                                    <p className="font-[OpenSans] text-lg">{item.category}</p>
                                    <p className="font-[OpenSans] text-lg">QTY: <span className="font-bold">{item.amount}</span>    </p>
                                </div>
                                <div className="flex h-full">
                                    <p className="text-sm font-semibold text-black flex">{dollarFormatter(item.product.price * item.amount)}</p>
                                </div>
                            </div>
                        );
                    })) :
                        <div className="flex h-full items-center justify-center">
                            <p>No items in cart</p>
                        </div>
                    }
                </div>
                <div className="flex flex-col font-[OpenSans]">
                    <span className="flex justify-between items-center gap-2.5 md:mb-2.5 md:mt-0 my-3.5">
                        <input type="text" minLength={2} maxLength={16} className="truncate w-3/5! border-2 border-[#841910] bg-white p-2.5 " placeholder="Discount Code or Gift Card" />
                        <button type="button" className={`${ButtonDesign} w-2/5! my-1.5!`}>Apply</button>
                    </span>
                    <span className="flex justify-between items-center">
                        <p>Quantity</p>
                        <p>{cartCount}</p>
                    </span>
                    <span className="flex justify-between items-center">
                        <p>Delivery</p>
                        <p className="italic">FREE</p>
                    </span>
                    <span className="flex justify-between items-center">
                        <p>Tax</p>
                        <p>{dollarFormatter((subtotal * 0.15))}</p>
                    </span>
                    <span className="flex justify-between items-center">
                        <p className="font-bold uppercase">Total to pay</p>
                        <p>{dollarFormatter(subtotal)}</p>
                    </span>
                </div>
                <button type="button" className={`${ButtonDesign} w-full`}>Pay Now</button>
            </div>
        </section>
    </div>)
}