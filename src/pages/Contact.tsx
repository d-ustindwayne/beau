import { useState, type ChangeEvent, type JSX } from "react";
import HeroHeading from "../components/HeroHeading";
import heroUrl from "/assets/misc_photos/DefaultHeroBackground.jpg";
import { ButtonDesign } from "../constants";
import sendButton from "/newsletter-email-button.svg";

export default function Contact(): JSX.Element {
    const [textCount, setTextCount] = useState(0);
    const handleTextCount = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextCount(e.target.value.length);
    };
    
    return (
        <>
        <HeroHeading textColor="text-white"
                alignment="items-center"
                title="Contact"
                mediaURL={heroUrl}
                darkenBackground={true} />
        <section className="w-full flex flex-row">
            <div className="lg:w-1/2 w-full flex flex-col lg:p-16.5 md:p-10.5 p-7.5">
                <form className="w-full">
                    <h1 className="lg:text-6xl text-5xl font-['Times_New_Roman'] italic text-center lg:text-start">Contact Us</h1>
                    <div className="w-full relative border-2 border-[#841910] md:my-8 my-6 bg-[#f8f9f6]">
                        <input id="fullName" type="fullName" minLength={2} maxLength={64} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                        <label htmlFor="fullName" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Full Name</label>
                    </div>
                    <div className="w-full relative border-2 border-[#841910] md:my-8 my-6 bg-[#f8f9f6]">
                        <input id="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                        <label htmlFor="email" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Email</label>
                    </div>
                    <div className="w-full relative border-2 border-[#841910] md:my-8 my-6 bg-[#f8f9f6]">
                        <textarea id="contactMessage" minLength={2} maxLength={500} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" onChange={handleTextCount}/>
                        <label htmlFor="contactMessage" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5
                            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Message</label>
                            <span className="absolute bottom-2 right-3">{textCount}/500</span>
                    </div>
                    <div className="w-full flex flex-col">
                        <button type="button" className={ButtonDesign}>Send Message</button>
                    </div>
                </form>
            </div>
            <div className="lg:w-1/2 w-full hidden lg:flex flex-col lg:p-16.5 md:p-10.5">
                <div className="flex flex-col">
                    <h2 className="font-['Times_New_Roman',serif] font-bold lg:text-3xl text-2xl">Customer Support</h2>
                    <p className="font-[OpenSans] md:text-2xl">Have questions about your order, account, or services? Our dedicated support team is here to help you 24/7. Reach out anytime, and we will get back to you as quickly as possible.</p>
                </div>
                <div className="flex flex-col mt-7.5">
                    <h2 className="font-['Times_New_Roman',serif] font-bold lg:text-3xl text-2xl">Affiliate Support</h2>
                    <p className="font-[OpenSans] md:text-2xl">Need assistance with your affiliate links, tracking, or payouts? Contact our partnership team for direct support, marketing materials, and optimization tips to help maximize your earnings.</p>
                </div>
            </div>
        </section>
        <section id="newsletter" className="bg-[#841910] text-white flex flex-col justify-center items-center lg:py-12 md:py-9 py-7.5">
                <h1 className="font-[\'Times_New_Roman\',serif] lg:text-5xl text-3xl italic">Subscribe to newsletter</h1>
                <h5 className="font-[OpenSans] lg:text-xl text-lg font-thin">Exclusive Offers: Get access to special promotions and discounts available only to subscribers.</h5>
                <div className="relative md:w-2/5 w-3/4 md:my-8 my-6">
                    <input id="email" type="email" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                    <label htmlFor="email" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Enter email here</label>
                    <span className="w-5 h-5 bg-center bg-no-repeat bg-contain absolute right-0 top-0 translate-y-full cursor-pointer">
                        <img src={sendButton} alt="Send" />
                        <span className="sr-only">Send Email Newsletter</span>
                    </span>
                </div>
            </section>
    </>
    )
}