import { useState } from "react"
import { Cart, useCartList } from "../cartData.tsx"
import { dollarFormatter } from "../constants"
import { Link } from "react-router-dom"

export default function CartSidebar() {
    addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === 'Escape' || e.key === 'q') handleClose();
    });

    const currentCart = useCartList("alphabet");
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [removingItems, setRemovingItems] = useState<Record<string, boolean>>({});

    const subtotal = Cart.getSubtotal(currentCart);
    const cartCount = Cart.getCount(currentCart);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
        }, 300);
    };

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
                onClick={() => setIsOpen(true)}
                aria-label="Open cart"
                className={`fixed right-0 top-1/3 -translate-y-1/2 z-40 flex flex-col items-center gap-2 px-2 py-4 bg-[#841910] text-white rounded-l-xl shadow-lg hover:bg-[#a11c10] active:scale-95 transition-all duration-200 cursor-pointer ${
                    isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
            >
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-[#F8E8BC] text-black text-[10px] font-bold leading-none">
                    {cartCount >= 100? "99+" : cartCount}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg"
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
                <span className="text-[10px] font-semibold tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">Cart</span>
            </button>

            <div onClick={handleClose} 
                className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
                    isOpen && !isClosing ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            <aside className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${
                    isOpen && !isClosing 
                        ? "translate-x-0 opacity-100" 
                        : "translate-x-full opacity-0" 
                }`}
            >
                <div className="flex items-center justify-between px-6 py-5 border-b border-white">
                    <h2 className="text-lg font-semibold tracking-tight text-black">
                        Your Cart
                    </h2>
                    <button onClick={handleClose} 
                        aria-label="Close cart"
                        className="p-2 rounded-full text-black hover:text-black hover:bg-white transition-colors duration-200 cursor-pointer">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    
                    {cartCount !== 0? (currentCart.map((item) => {
                        const itemKey = `${item.category}-${item.product.name}`;
                        const isRemoving = removingItems[itemKey];
                        
                        return (
                            <div key={itemKey}
                                className={`relative flex items-center gap-4 py-3 border-b border-white last:border-0 transition-all duration-300 ease-in-out origin-center ${
                                    isRemoving ? "scale-90 opacity-0 pointer-events-none" : "scale-100 opacity-100"
                                }`}
                            >
                                <div className="w-14 h-18 rounded-lg shrink-0">
                                    <img className="w-full object-cover" src={item.product.photoUrl}/>
                                </div>
                                <div className="flex-1 min-w-0 min-h-3/4">
                                    <p className="text-sm font-medium text-black truncate"><span className="font-bold">{item.category.replaceAll('_', ' ')}</span> | {item.product.name}</p>
                                    <div className="w-fit flex flex-row align-top border border-black justify-start mt-2 text-black">
                                        <button className="h-lh font-extrabold border-r w-7.5 cursor-pointer" onClick={() => {
                                            if (item.amount === 1) handleRemoveProduct(item.category, item.product.name)
                                            else Cart.remove(item.category, item.product.name);
                                        }}>-</button>
                                        <span className="flex items-center justify-center text-xs font-semibold w-7.5 text-center">{item.amount}</span>
                                        <button className="h-lh font-extrabold border-l w-7.5 cursor-pointer" onClick={() => {Cart.add(item.category, item.product)}}>+</button>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-black">{dollarFormatter(item.product.price * item.amount)}</p>
                                <span className="absolute top-0 right-0 text-black cursor-pointer" onClick={() => handleRemoveProduct(item.category, item.product.name)}>&times;</span>
                            </div>
                        );
                    })) : 
                        <div className="flex h-full items-center justify-center">
                            <p>No items in cart</p>
                        </div>
                    }
                </div>

                <div className="px-6 py-5 border-t border-white space-y-4">
                    <div className="flex items-center justify-between text-sm text-black">
                        <span>Subtotal</span>
                        <span className="font-semibold text-black">{dollarFormatter(subtotal)}</span>
                    </div>
                    <Link to="/checkout" className={`w-full block text-center py-3 rounded-full bg-[#841910] text-white text-sm font-semibold active:scale-[0.98] transition-all duration-200 ${cartCount !== 0? 'cursor-pointer' : 'cursor-not-allowed! bg-gray-700!'}`} onClick={cartCount !== 0? handleClose : (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault()}>
                        Checkout
                    </Link>
                    <button onClick={handleClose} 
                        className="w-full py-2.5 rounded-full border border-white text-black text-sm font-medium hover:bg-white transition-colors duration-200 cursor-pointer">
                        Continue Shopping
                    </button>
                </div>
            </aside>
        </>
    );
}