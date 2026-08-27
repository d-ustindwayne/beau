import { type JSX } from "react";
import HeroHeading from "../components/HeroHeading";
import heroUrl from "/assets/misc_photos/DefaultHeroBackground.jpg";
import MediaText from "../components/MediaText";
import aboutPhoto from "/assets/misc_photos/OurStoryPhoto.jpg";
import missionPhoto from "/assets/misc_photos/MissionVision.jpg";


export default function About(): JSX.Element {
    return (
        <>
            <HeroHeading textColor="text-white"
                alignment="items-center"
                title="About"
                mediaURL={heroUrl}
                darkenBackground={true} />

            <MediaText
                mediaType="image"
                mediaURL={aboutPhoto}
                mediaAlt="ImageNotFound"
                direction="tnp"
                title="Our Story"
                font="font-['Times_New_Roman'] italic font-normal text-7xl sm:py-0 pt-3! pb-12"
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

            <section className="flex md:flex-row flex-col w-dvw h-fit bg-blend-lighten bg-center bg-no-repeat bg-cover bg-[#efecdcb5]" style={{ backgroundImage: `url(${missionPhoto})` }}>
                <div className="md:w-1/2 w-full text-center p-10 ">
                    <h1 className="p-7.5 text-5xl font-[TimesNewRoman]">Vision</h1>
                    <p className="font-[OpenSans] text-2xl p-8.5">To redefine global luxury cosmetics by elevating everyday beauty into an architectural art form, where intentional design and timeless elegance coexist flawlessly.</p>
                </div>

                <div className="md:w-1/2 w-full text-center p-10 ">
                    <h1 className="p-7.5 text-5xl font-[TimesNewRoman]">Mission</h1>
                    <p className="font-[OpenSans] text-2xl p-8.5">Our mission is to craft premium cosmetics housed in meticulously engineered geometric silhouettes, combining structural precision with minimalist luxury to elevate beauty into an art form.</p>
                </div>
            </section>

            <section>
                <p className="font-[TimesNewRoman] italic text-center text-4xl p-10 m-13 md:py-21">"We do not just create luxury cosmetics; we curate a community of individuals who appreciate sophistication, structure, and intentional design."</p>
            </section>
        </>
    )
}