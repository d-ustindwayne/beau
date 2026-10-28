import { type JSX } from "react";
import HeroHeading from "../components/HeroHeading";
import heroUrl from "/assets/hero/default-hero.webp";
import MediaText from "../components/MediaText";
import aboutPhoto from "/assets/sections/our-story.webp";
import missionPhoto from "/assets/sections/mission-vision.webp";


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

            <section>
                <blockquote className="font-serif italic text-center md:text-4xl text-2xl leading-snug max-w-5xl mx-auto md:p-10 px-6 py-12 md:m-13 md:py-21">"We do not just create luxury cosmetics; we curate a community of individuals who appreciate sophistication, structure, and intentional design."</blockquote>
            </section>
        </>
    )
}
