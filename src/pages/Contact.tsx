import { useState, type ChangeEvent, type FormEvent, type JSX } from "react";
import HeroHeading from "../components/HeroHeading";
import FloatingInput from "../components/FloatingInput";
import Newsletter from "../components/Newsletter";
import heroUrl from "/assets/hero/default-hero.webp";
import { ButtonDesign, FieldControl, FieldLabel, FieldWrapper } from "../constants";

const MESSAGE_LIMIT = 500;

export default function Contact(): JSX.Element {
    const [textCount, setTextCount] = useState(0);
    const [isSent, setIsSent] = useState(false);
    const handleTextCount = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTextCount(e.target.value.length);
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSent(true);
        setTextCount(0);
        e.currentTarget.reset();
    };

    return (
        <>
        <title>Contact | beau</title>
        <HeroHeading textColor="text-white"
                alignment="items-center"
                title="Contact"
                mediaURL={heroUrl}
                darkenBackground={true} />
        <section className="w-full flex lg:flex-row flex-col">
            <div className="lg:w-1/2 w-full flex flex-col lg:p-16.5 md:p-10.5 p-7.5">
                <form className="w-full" onSubmit={handleSubmit} onInput={() => setIsSent(false)}>
                    <h2 className="lg:text-6xl text-5xl font-serif italic text-center lg:text-start">Contact Us</h2>
                    <FloatingInput id="contact-name" label="Full Name" name="name" autoComplete="name" required minLength={2} maxLength={64} wrapperClassName="md:my-8 my-6" />
                    <FloatingInput id="contact-email" label="Email" type="email" name="email" autoComplete="email" required maxLength={100} wrapperClassName="md:my-8 my-6" />
                    <div className={`${FieldWrapper} md:my-8 my-6`}>
                        <textarea id="contact-message" name="message" rows={5} required minLength={2} maxLength={MESSAGE_LIMIT} placeholder=" " aria-describedby="contact-message-count"
                            className={`${FieldControl} pb-8 resize-y min-h-32`} onChange={handleTextCount}/>
                        <label htmlFor="contact-message" className={FieldLabel}>Message</label>
                        <span id="contact-message-count" className={`absolute bottom-2 right-3 text-xs tabular-nums ${textCount >= MESSAGE_LIMIT ? "text-beau font-semibold" : "text-neutral-600"}`}>{textCount}/{MESSAGE_LIMIT}</span>
                    </div>
                    <div className="w-full flex flex-col">
                        <button type="submit" className={`${ButtonDesign} w-full! my-0!`}>Send Message</button>
                        <p role="status" className="min-h-6 mt-3 text-center lg:text-start text-beau font-medium">
                            {isSent ? "Thank you! Your message has been sent. We'll get back to you soon." : ""}
                        </p>
                    </div>
                </form>
            </div>
            <div className="lg:w-1/2 w-full flex flex-col gap-7.5 lg:p-16.5 md:px-10.5 md:pb-10.5 px-7.5 pb-7.5">
                <div className="flex flex-col gap-2">
                    <h3 className="font-serif font-bold lg:text-3xl text-2xl">Customer Support</h3>
                    <p className="font-sans md:text-2xl text-lg leading-snug">Have questions about your order, account, or services? Our dedicated support team is here to help you 24/7. Reach out anytime, and we will get back to you as quickly as possible.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="font-serif font-bold lg:text-3xl text-2xl">Affiliate Support</h3>
                    <p className="font-sans md:text-2xl text-lg leading-snug">Need assistance with your affiliate links, tracking, or payouts? Contact our partnership team for direct support, marketing materials, and optimization tips to help maximize your earnings.</p>
                </div>
            </div>
        </section>
        <Newsletter />
    </>
    )
}
