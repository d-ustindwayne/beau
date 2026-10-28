import { type JSX } from "react";
import { Link } from "react-router-dom";
import PhotoSlot from "../components/PhotoSlot";
import { ButtonDesign } from "../constants";
import HeroHeading from "../components/HeroHeading";
import heroUrl from "/assets/hero/default-hero.webp";
import MediaText from "../components/MediaText";
import aboutPhoto from "/assets/sections/our-story.webp";
import missionPhoto from "/assets/sections/mission-vision.webp";

const values = [
    { title: "Intentional design", text: "Every case is engineered as a geometric object, made to be kept, refilled and admired.", icon: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12v9M12 12L4 7.5" },
    { title: "Cruelty-free", text: "We never test on animals, and we only partner with suppliers who share that promise.", icon: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" },
    { title: "Shades for everyone", text: "Every shade description explains its true tone, including how it appears with colour-vision differences.", icon: "M12 3a9 9 0 1 0 0 18c1 0 1.5-.7 1.5-1.5 0-1.2-1-1.5-1-2.5 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4.2-4-7.5-9-7.5zM7.5 12.5h.01M9.5 8h.01M14.5 8h.01" },
    { title: "Made to last", text: "Long-wear formulas and refill-ready cases mean less waste and more of what you love.", icon: "M4 12a8 8 0 0 1 14-5.3M20 4v4h-4M20 12a8 8 0 0 1-14 5.3M4 20v-4h4" },
];


export default function About(): JSX.Element {
    return (
        <>
            <title>About | beau</title>
            <HeroHeading textColor="text-white"
                alignment="items-center"
                title="About"
                mediaURL={heroUrl}
                darkenBackground={true} />

            <MediaText
                mediaType="image"
                mediaURL={aboutPhoto}
                mediaWidth={1024}
                mediaHeight={1024}
                mediaAlt="beau lipsticks styled in a minimalist display"
                direction="tnp"
                title="Our Story"
                font="font-serif italic font-normal"
                alignment="items-start"
                subtitle=""
                description="Be•au was born from a singular vision: to strip away the noise of the traditional beauty industry and return to a state of pure, intentional design. Founded on the modern minimalism, we set out to create more than just cosmetics. We sought to craft objects of desire."
                ratio="6&6"
                phoneHideMedia={false} />

            {/* <MediaText
            mediaType="image"
            mediaURL={missionPhoto}
            mediaAlt="ImageNotFound"
            direction="pnt"
            title="Mission"
            description="lorem ipsum dolor sit amet tenka humai ponlao wen turtokina mane"
            hasButton={true}
            buttonContent="Learn More"
            ratio="4&8"/> */}

            <section className="flex md:flex-row flex-col w-full h-fit bg-blend-lighten bg-center bg-no-repeat bg-cover bg-[#efecdcb5]" style={{ backgroundImage: `url(${missionPhoto})` }}>
                <div className="md:w-1/2 w-full text-center lg:p-10 sm:p-8 p-6">
                    <h2 className="lg:p-7.5 p-4 md:text-5xl text-4xl font-serif italic">Vision</h2>
                    <p className="font-sans md:text-2xl text-xl leading-snug lg:p-8.5 sm:p-4 p-2">To redefine global luxury cosmetics by elevating everyday beauty into an architectural art form, where intentional design and timeless elegance coexist flawlessly.</p>
                </div>

                <div className="md:w-1/2 w-full text-center lg:p-10 sm:p-8 p-6">
                    <h2 className="lg:p-7.5 p-4 md:text-5xl text-4xl font-serif italic">Mission</h2>
                    <p className="font-sans md:text-2xl text-xl leading-snug lg:p-8.5 sm:p-4 p-2">Our mission is to craft premium cosmetics housed in meticulously engineered geometric silhouettes, combining structural precision with minimalist luxury to elevate beauty into an art form.</p>
                </div>
            </section>

            <section aria-labelledby="values-title" className="bg-white">
                <div className="max-w-6xl mx-auto px-6 md:py-16 py-12">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau text-center">Our values</p>
                    <h2 id="values-title" className="font-serif italic lg:text-6xl text-5xl text-center mt-2">What we stand for</h2>
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-12">
                        {values.map((value) => (
                            <li key={value.title} className="flex flex-col items-center text-center">
                                <span aria-hidden="true" className="flex items-center justify-center size-14 rounded-full bg-cream border border-beau/20 text-beau">
                                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d={value.icon} /></svg>
                                </span>
                                <h3 className="font-serif text-2xl mt-4">{value.title}</h3>
                                <p className="font-sans text-neutral-700 mt-2 leading-relaxed">{value.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section aria-labelledby="studio-title" className="flex md:flex-row flex-col">
                <div className="md:w-1/2 w-full">
                    <PhotoSlot src={`${import.meta.env.BASE_URL}assets/sections/studio.webp`} width={1200} height={900}
                        alt="Hands assembling a gold geometric be•au lipstick case at a marble studio bench"
                        label="Studio craft photo, 1200 × 900 (4:3), saved as /public/assets/sections/studio.webp"
                        className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 w-full flex flex-col justify-center lg:p-14 sm:p-10 p-7 bg-cream">
                    <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-beau">Inside the studio</p>
                    <h2 id="studio-title" className="font-serif italic lg:text-6xl text-5xl mt-2">Crafted in Manukau</h2>
                    <p className="font-sans md:text-xl text-lg leading-relaxed mt-5 text-neutral-800">Every be•au shade begins at our Manukau studio, where colour is mixed in small batches and each geometric case is polished and checked by hand. It's slower than mass production, and that's the point.</p>
                    <dl className="grid grid-cols-3 gap-4 mt-8 border-t border-beau/20 pt-6">
                        <div><dt className="font-sans text-xs uppercase tracking-wider text-neutral-600">Collections</dt><dd className="font-serif text-4xl mt-1">5</dd></div>
                        <div><dt className="font-sans text-xs uppercase tracking-wider text-neutral-600">Shades</dt><dd className="font-serif text-4xl mt-1">20</dd></div>
                        <div><dt className="font-sans text-xs uppercase tracking-wider text-neutral-600">Finishes</dt><dd className="font-serif text-4xl mt-1">3</dd></div>
                    </dl>
                </div>
            </section>

            <section aria-label="Our philosophy" className="px-6 md:py-24 py-16">
                <figure className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <span aria-hidden="true" className="font-serif text-beau text-8xl leading-none h-12">&ldquo;</span>
                    <blockquote className="font-serif italic md:text-4xl text-2xl leading-snug text-balance mt-4">
                        We do not just create luxury cosmetics; we curate a community of individuals who appreciate sophistication, structure, and intentional design.
                    </blockquote>
                    <span aria-hidden="true" className="block w-16 h-px bg-beau mt-8" />
                    <figcaption className="font-sans text-sm uppercase tracking-[0.25em] text-neutral-700 mt-4">The be•au philosophy</figcaption>
                </figure>
            </section>

            <section className="on-dark bg-beau text-white">
                <div className="max-w-6xl mx-auto px-6 md:py-14 py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 text-center md:text-start">
                    <div>
                        <h2 className="font-serif italic lg:text-5xl text-4xl">Visit a boutique</h2>
                        <p className="font-sans font-light text-lg mt-3 max-w-xl">Try every shade in person, with a complimentary consultation at our Manukau flagship.</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center shrink-0">
                        <Link to="/store-locator" className={`${ButtonDesign} my-0! bg-white! text-beau! hover:bg-sand! text-lg!`}>Find a store</Link>
                        <Link to="/collections" className={`${ButtonDesign} my-0! bg-transparent! border-2 border-white hover:bg-white/10! text-lg!`}>Explore collections</Link>
                    </div>
                </div>
            </section>
        </>
    )
}
