import { useId, useState, type FormEvent, type JSX } from "react";
import sendButton from "/assets/icons/send-arrow.svg";

export default function Newsletter(): JSX.Element {
    const inputId = useId();
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubscribed(true);
        e.currentTarget.reset();
    };

    return (
        <section id="newsletter" aria-labelledby={`${inputId}-title`} className="on-dark bg-beau text-white flex flex-col justify-center items-center text-center px-5 lg:py-12 md:py-9 py-7.5">
            <h2 id={`${inputId}-title`} className="font-serif lg:text-5xl text-3xl italic">Subscribe to newsletter</h2>
            <p className="font-sans lg:text-xl text-lg font-light mt-2 max-w-2xl">Exclusive Offers: Get access to special promotions and discounts available only to subscribers.</p>
            <form onSubmit={handleSubmit} className="relative md:w-2/5 w-3/4 md:mt-8 mt-6">
                <input id={inputId} type="email" name="email" required autoComplete="email" maxLength={100} placeholder=" "
                    onInput={() => setIsSubscribed(false)}
                    className="peer block w-full ps-2.5 pe-12 pb-2.5 pt-5 text-sm text-white bg-transparent border-b-2 border-white/80 focus:border-white outline-0 transition-colors" />
                <label htmlFor={inputId} className="absolute text-sm text-white/90 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5 pointer-events-none
                    peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Enter email here</label>
                <button type="submit" className="absolute right-0 bottom-1 flex items-center justify-center size-10 transition-transform duration-200 hover:translate-x-1">
                    <img src={sendButton} alt="" aria-hidden="true" className="w-6.5 h-3.5" />
                    <span className="sr-only">Subscribe to newsletter</span>
                </button>
            </form>
            <p role="status" className={`font-sans text-sm text-sand min-h-5 mt-3 ${isSubscribed ? "animate-fade-in" : ""}`}>
                {isSubscribed ? "Thank you for subscribing! Look out for our next letter." : ""}
            </p>
        </section>
    );
}
