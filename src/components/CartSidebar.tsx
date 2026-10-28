import { useRef, useState } from "react"
import { Cart, useCartList } from "../cartData.tsx"
import { dollarFormatter, formatCategory } from "../constants"
import { Link } from "react-router-dom"
import { useDialog } from "../hooks.ts"
import LazyImage from "./LazyImage.tsx"
import QuantityStepper from "./QuantityStepper.tsx"

export default function CartSidebar() {
    const currentCart = useCartList("alphabet");
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [removingItems, setRemovingItems] = useState<Record<string, boolean>>({});
    const panelRef = useRef<HTMLElement>(null);

    const subtotal = Cart.getSubtotal(currentCart);
    const cartCount = Cart.getCount(currentCart);
    const isVisible = isOpen && !isClosing;

    const handleClose = () => {
        if (!isOpen || isClosing) return;
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 300);
    };

    useDialog(isVisible, panelRef, handleClose, ["Escape", "q"]);

    const handleRemoveProduct = (category: string, name: string) => {
        const itemKey = `${category}-${name}`;
        setRemovingItems(prev => ({ ...prev, [itemKey]: true }));
        setTimeout(async () => {
            await Cart.remove(category, name, true);
            setRemovingItems(prev => {
                const updated = { ...prev };
                delete updated[itemKey];
                return updated;
            });
        }, 300);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={`Open cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
                aria-haspopup="dialog"
                aria-expanded={isVisible}
                className={`fixed right-0 top-1/3 -translate-y-1/2 z-40 flex flex-col items-center gap-2 px-2 py-4 bg-beau text-white rounded-l-xl shadow-lg hover:bg-beau-dark active:scale-95 transition-all duration-200 cursor-pointer ${
                    isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <span key={cartCount} className="min-w-6 h-6 px-1 flex items-center justify-center rounded-full bg-sand text-black text-[10px] font-bold leading-none tabular-nums animate-pop-in">
                    {cartCount >= 100? "99+" : cartCount}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11"
                    />
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="18" cy="21" r="1" />
                </svg>
                <span aria-hidden="true" className="text-[10px] font-semibold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">Cart</span>
            </button>

            <div onClick={handleClose} aria-hidden="true"
                className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
                    isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            <aside ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="cart-title" inert={!isVisible}
                className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
                    isVisible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-full opacity-0"
                }`}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-black/10">
                    <h2 id="cart-title" className="font-serif italic text-3xl text-black">
                        Your Cart {cartCount > 0 && <span className="font-sans not-italic text-base text-neutral-600">({cartCount})</span>}
                    </h2>
                    <button type="button" onClick={handleClose}
                        aria-label="Close cart"
                        className="p-2 rounded-full text-black hover:bg-sand transition-colors duration-200 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-2">
                    {cartCount !== 0? (<ul>{currentCart.map((item) => {
                        const itemKey = `${item.category}-${item.product.name}`;
                        const isRemoving = removingItems[itemKey];
                        const category = formatCategory(item.category);

                        return (
                            <li key={itemKey}
                                className={`flex items-center gap-4 py-4 border-b border-black/10 last:border-0 transition-all duration-300 ease-in-out origin-center ${
                                    isRemoving ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100"
                                }`}
                            >
                                <LazyImage className="w-14 aspect-3/4 shrink-0 object-cover" src={item.product.photoUrl} alt={`${item.product.name} lipstick from ${category}`} width={56} height={75} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-black truncate"><span className="font-bold">{category}</span> | {item.product.name}</p>
                                    <p className="text-xs text-neutral-600">{dollarFormatter(item.product.price)} each</p>
                                    <QuantityStepper size="sm" value={item.amount} itemLabel={item.product.name}
                                        onDecrement={() => {
                                            if (item.amount === 1) handleRemoveProduct(item.category, item.product.name)
                                            else Cart.remove(item.category, item.product.name);
                                        }}
                                        onIncrement={() => { Cart.add(item.category, item.product) }} />
                                </div>
                                <div className="flex flex-col items-end justify-between self-stretch">
                                    <button type="button" onClick={() => handleRemoveProduct(item.category, item.product.name)}
                                        aria-label={`Remove ${item.product.name} from cart`}
                                        className="flex items-center justify-center size-7 -me-1.5 rounded-full text-neutral-600 hover:text-black hover:bg-sand transition-colors">
                                        <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                    <p className="text-sm font-semibold text-black tabular-nums">{dollarFormatter(item.product.price * item.amount)}</p>
                                </div>
                            </li>
                        );
                    })}</ul>) :
                        <div className="flex flex-col h-full items-center justify-center gap-3 text-center">
                            <svg aria-hidden="true" className="size-12 text-beau/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6h11" />
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="18" cy="21" r="1" />
                            </svg>
                            <p className="font-serif italic text-2xl text-black">Your cart is empty</p>
                            <p className="text-sm text-neutral-600">Find your next favourite shade.</p>
                        </div>
                    }
                </div>

                <div className="px-6 py-5 border-t border-black/10 space-y-3">
                    <div className="flex items-center justify-between text-sm text-black">
                        <span>Subtotal <span className="text-neutral-600">(GST incl.)</span></span>
                        <span className="font-semibold text-black text-base tabular-nums">{dollarFormatter(subtotal)}</span>
                    </div>
                    <Link to="/checkout" aria-disabled={cartCount === 0}
                        className={`w-full block text-center py-3 rounded-full text-white text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${cartCount !== 0? 'bg-beau hover:bg-beau-dark active:scale-[0.98] cursor-pointer' : 'bg-neutral-500 cursor-not-allowed'}`}
                        onClick={cartCount !== 0? handleClose : (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}>
                        Checkout
                    </Link>
                    <button type="button" onClick={handleClose}
                        className="w-full py-2.5 rounded-full border border-black/20 text-black text-sm font-medium hover:bg-cream hover:border-black/40 transition-colors duration-200 cursor-pointer">
                        Continue Shopping
                    </button>
                </div>
            </aside>
        </>
    );
}
