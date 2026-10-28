import { Cart, useCartList } from "../cartData.tsx";
import { ButtonDesign, dollarFormatter, formatCategory, gstFromInclusive } from "../constants";
import { useState, type FormEvent, type JSX } from "react";
import { Link } from "react-router-dom";
import FloatingInput from "../components/FloatingInput";
import LazyImage from "../components/LazyImage";

const sectionHeading = "font-serif font-semibold italic lg:text-6xl text-5xl my-2.5";
const divider = <span aria-hidden="true" className="flex bg-beau lg:h-px h-0.5 w-full my-4.5"></span>;
const fieldSpacing = "md:my-5.5 my-3.5";

export default function Checkout(): JSX.Element {
    const currentCart = useCartList("alphabet");
    const subtotal = Cart.getSubtotal(currentCart);
    const cartCount = Cart.getCount(currentCart);
    const [discountCode, setDiscountCode] = useState("");
    const [discountMessage, setDiscountMessage] = useState("");
    const [orderTotal, setOrderTotal] = useState<number | null>(null);

    const applyDiscount = () => {
        setDiscountMessage(discountCode.trim() === "" ? "Please enter a code." : "This code is invalid or has expired.");
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (cartCount === 0) return;
        setOrderTotal(subtotal);
        await Cart.clear();
        window.scrollTo({ top: 0 });
    };

    if (orderTotal !== null) return (
        <section className="flex flex-col items-center justify-center text-center px-6 py-24 animate-pop-in">
            <title>Order confirmed | beau</title>
            <span aria-hidden="true" className="flex items-center justify-center size-16 rounded-full bg-beau text-white text-3xl mb-6">&#10003;</span>
            <h1 className="font-serif italic lg:text-6xl text-5xl">Thank you!</h1>
            <p role="status" className="font-sans text-xl mt-4 max-w-lg">Your order of <span className="font-semibold">{dollarFormatter(orderTotal)}</span> has been placed.</p>
            <p className="font-sans text-sm text-neutral-600 mt-2">This is a demo store, so no payment was taken.</p>
            <Link to="/shop" className={ButtonDesign}>Continue Shopping</Link>
        </section>
    );

    return (<div className="flex justify-center">
        <title>Checkout | beau</title>
        <h1 className="sr-only">Checkout</h1>
        <section className="md:max-w-full sm:max-w-[87.5dvw] max-w-full w-full flex flex-col md:flex-row justify-center md:border-x-0 sm:border-x-3 border-x-0 border-x-beau">
            <form id="checkout-form" onSubmit={handleSubmit} className="md:w-1/2 w-full sm:p-6.5 p-5 flex flex-col md:border-r-beau md:border-r">
                <h2 className={sectionHeading}>Delivery</h2>
                {divider}
                <fieldset className="w-full">
                    <legend className="sr-only">Delivery details</legend>
                    <FloatingInput id="delivery-email" label="Email" type="email" autoComplete="email" required maxLength={100} wrapperClassName={fieldSpacing} />
                    <div className={`flex sm:flex-row flex-col ${fieldSpacing} sm:gap-4 gap-3.5`}>
                        <FloatingInput id="delivery-first-name" label="First Name" autoComplete="given-name" required minLength={2} maxLength={100} />
                        <FloatingInput id="delivery-last-name" label="Last Name" autoComplete="family-name" required minLength={2} maxLength={100} />
                    </div>
                    <FloatingInput id="delivery-company" label="Company (Optional)" autoComplete="organization" maxLength={100} wrapperClassName={fieldSpacing} />
                    <FloatingInput id="delivery-address-1" label="Address" autoComplete="address-line1" required minLength={2} maxLength={100} wrapperClassName={fieldSpacing} />
                    <FloatingInput id="delivery-address-2" label="Apartment, suite, etc. (Optional)" autoComplete="address-line2" maxLength={100} wrapperClassName={fieldSpacing} />
                    <div className={`grid sm:grid-cols-3 grid-cols-2 ${fieldSpacing} sm:gap-4 gap-3.5`}>
                        <FloatingInput id="delivery-city" label="City" autoComplete="address-level2" required minLength={2} maxLength={100} />
                        <FloatingInput id="delivery-region" label="Region" autoComplete="address-level1" required minLength={2} maxLength={100} />
                        <FloatingInput id="delivery-postcode" label="Postal Code" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{4}" title="4-digit NZ postcode" required maxLength={4} wrapperClassName="max-sm:col-span-2" />
                    </div>
                    <FloatingInput id="delivery-phone" label="Phone" type="tel" autoComplete="tel" required minLength={7} maxLength={20} wrapperClassName={fieldSpacing} />
                </fieldset>

                <h2 className={`${sectionHeading} mt-6`}>Payment</h2>
                {divider}
                <fieldset className="w-full">
                    <legend className="sr-only">Payment details</legend>
                    <FloatingInput id="card-number" label="Card Number" autoComplete="cc-number" inputMode="numeric" pattern="[0-9 ]{12,23}" title="12 to 19 digit card number" required maxLength={23} wrapperClassName={fieldSpacing} />
                    <div className={`flex ${fieldSpacing} sm:gap-4 gap-3.5`}>
                        <FloatingInput id="card-expiry" label="Expiration Date (MM/YY)" autoComplete="cc-exp" inputMode="numeric" pattern="(0[1-9]|1[0-2])\/?[0-9]{2}" title="MM/YY" required maxLength={5} />
                        <FloatingInput id="card-cvc" label="Security Code" autoComplete="cc-csc" inputMode="numeric" pattern="[0-9]{3,4}" title="3 or 4 digits" required maxLength={4} />
                    </div>
                    <FloatingInput id="card-name" label="Name on Card" autoComplete="cc-name" required minLength={2} maxLength={100} wrapperClassName={fieldSpacing} />
                </fieldset>
            </form>
            <div className="md:w-1/2 w-full sm:p-6.5 p-5 flex flex-col md:border-l-beau md:border-l">
                <div className="md:sticky md:top-6">
                <h2 className={sectionHeading}>Order Summary</h2>
                {divider}
                {cartCount !== 0 ? (<ul className="flex flex-col">{currentCart.map((item) => {
                        const itemKey = `${item.category}-${item.product.name}`;
                        const category = formatCategory(item.category);
                        return (
                            <li key={itemKey}
                                className="flex items-center gap-4 py-3 border-b border-black/10 last:border-0">
                                <LazyImage className="md:w-20 w-16 aspect-3/4 shrink-0 object-cover" src={item.product.photoUrl} alt={`${category} – ${item.product.name}`} width={80} height={107} />
                                <div className="flex-1 min-w-0 flex flex-col justify-start items-start">
                                    <p className="font-bold font-serif text-xl">{item.product.name}</p>
                                    <p className="font-sans md:text-lg text-base">{category}</p>
                                    <p className="font-sans md:text-lg text-base">QTY: <span className="font-bold">{item.amount}</span></p>
                                </div>
                                <p className="font-sans md:text-lg text-base font-semibold text-black tabular-nums">{dollarFormatter(item.product.price * item.amount)}</p>
                            </li>
                        );
                    })}</ul>) :
                        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                            <p className="font-serif italic text-2xl">Your cart is empty</p>
                            <Link to="/shop" className="text-beau underline underline-offset-4 hover:text-beau-dark">Browse the shop</Link>
                        </div>
                    }
                <div className="flex flex-col font-sans gap-2 mt-4">
                    <div className="flex flex-col gap-1 mb-2">
                        <span className="flex justify-between items-stretch gap-2.5">
                            <label htmlFor="discount-code" className="sr-only">Discount code or gift card</label>
                            <input id="discount-code" type="text" value={discountCode} maxLength={16}
                                onChange={(e) => { setDiscountCode(e.target.value); setDiscountMessage(""); }}
                                className="min-w-0 flex-1 border-2 border-beau bg-white px-2.5 py-2 outline-0 transition-shadow focus:shadow-[0_0_0_3px_rgb(132_25_16/0.18)]" placeholder="Discount Code or Gift Card" />
                            <button type="button" onClick={applyDiscount} className={`${ButtonDesign} my-0! text-base! px-5!`}>Apply</button>
                        </span>
                        <p role="status" className="min-h-5 text-sm text-beau">{discountMessage}</p>
                    </div>
                    <span className="flex justify-between items-center">
                        <p>Quantity</p>
                        <p className="tabular-nums">{cartCount}</p>
                    </span>
                    <span className="flex justify-between items-center">
                        <p>Delivery</p>
                        <p className="italic">FREE</p>
                    </span>
                    <span className="flex justify-between items-center">
                        <p>GST <span className="text-neutral-600">(15%, included)</span></p>
                        <p className="tabular-nums">{dollarFormatter(gstFromInclusive(subtotal))}</p>
                    </span>
                    <span className="flex justify-between items-center border-t border-black/15 pt-3 mt-1 text-lg">
                        <p className="font-bold uppercase">Total to pay</p>
                        <p className="font-bold tabular-nums">{dollarFormatter(subtotal)}</p>
                    </span>
                </div>
                <button type="submit" form="checkout-form" disabled={cartCount === 0} className={`${ButtonDesign} w-full`}>Pay Now</button>
                </div>
            </div>
        </section>
    </div>)
}
