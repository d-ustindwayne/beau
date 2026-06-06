import type { ReactElement } from "react"
import { Link } from 'react-router-dom'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import '@splidejs/react-splide/css'
import MediaText from '../components/MediaText'
import productList from '../productList.json' with {type: 'json'}
import { AnchorDesign, ButtonDesign, SplideClass } from '../constants'
import affiliatePhoto from '/src/assets/misc_photos/AffiliatePhoto.jpg'
import getLookPhoto from '/src/assets/misc_photos/LookHighlightPhoto.jpg'
import sendButton from '/src/newsletter-email-button.svg'
import { getProducts } from '../constants'

export default function Index(): ReactElement {
    return (
        <>
            <header id="header-carousel">
                <Splide hasTrack={false} aria-label="Header Carousel" tag="section"
                    options={ { type: 'loop', rewind: true, arrow: true, drag: 'free', snap: true,
                    lazyLoad: 'nearby', classes: SplideClass } }>
                    <SplideTrack>
                        <SplideSlide className="relative text-center">
                            <img className="w-dvw" src="src/assets/HeaderCarousel/CarouselImage1.png" alt="IMAGE" />
                            <Link to="/shop" className={`${ButtonDesign} z-10 absolute lg:bottom-15 md:bottom-9 sm:bottom-5 bottom-8 right-1/2 translate-x-1/2`}>Shop Now</Link>
                        </SplideSlide>
                        <SplideSlide className="relative">
                            <img className="w-dvw" src="src/assets/HeaderCarousel/CarouselImage2.png" alt="IMAGE" />
                            <Link to="/shop" className={`${ButtonDesign} z-10 absolute lg:bottom-15 md:bottom-9 sm:bottom-5 bottom-8 right-1/2 translate-x-1/2`}>Shop Now</Link>
                        </SplideSlide>
                        <SplideSlide className="relative">
                            <img className="w-dvw" src="src/assets/HeaderCarousel/CarouselImage3.png" alt="IMAGE" />
                            <Link to="/shop" className={`${ButtonDesign} z-10 absolute lg:bottom-15 md:bottom-9 sm:bottom-5 bottom-8 right-1/2 translate-x-1/2`}>Shop Now</Link>
                        </SplideSlide>
                    </SplideTrack>
                </Splide>
            </header>

            {/* <section id="product-highlights">
                <h1 className="md:py-7 py-5 bg-zinc-100 sm:text-5xl text-4xl text-center font-bold font-serif">Our Products</h1>
                <Splide className="sm:block hidden" hasTrack={false} aria-label="Header Carousel" tag="section"
                    options={ { type: 'loop', rewind: true, arrow: true, snap: true, perMove: 1, autoplay: true,
                    padding: '5rem', perPage: 3, lazyLoad: 'nearby', focus: 'center', classes: defaultClasses,} }>
                    <SplideTrack>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product1.png" alt="IMAGE" /></SplideSlide>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product2.png" alt="IMAGE" /></SplideSlide>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product3.png" alt="IMAGE" /></SplideSlide>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product4.png" alt="IMAGE" /></SplideSlide>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product5.png" alt="IMAGE" /></SplideSlide>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product6.png" alt="IMAGE" /></SplideSlide>
                    </SplideTrack>
                </Splide>
                <Splide className="block sm:hidden" hasTrack={false} aria-label="Header Carousel" tag="section"
                    options={ { type: 'loop', rewind: true, snap: true, perMove: 1, autoplay: true, pagination: false,
                    padding: '2.5rem', perPage: 1, lazyLoad: 'nearby', classes: defaultClasses,} }>
                    <SplideTrack>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product1.png" alt="IMAGE" /></SplideSlide>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product2.png" alt="IMAGE" /></SplideSlide>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product3.png" alt="IMAGE" /></SplideSlide>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product4.png" alt="IMAGE" /></SplideSlide>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product5.png" alt="IMAGE" /></SplideSlide>
                        <SplideSlide><img className="" src="src/assets/ProductsCarousel/Product6.png" alt="IMAGE" /></SplideSlide>
                    </SplideTrack>
                </Splide>
            </section> */}

            <section className="bg-[#d2e5eb] flex flex-col items-center justify-center pb-12 pt-7.5">
                <h1 className='font-[\"Times_New_Roman\",serif] text-6xl text-center italic pt-5 pb-6.25'>Winter Garden Collection</h1>
                <div className="lg:grid md:hidden hidden grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getProducts(productList, "Winter Garden")}
                </div>
                <div className="lg:hidden md:grid hidden grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getProducts(productList, "Winter Garden", false, 3)}
                </div>
                <div className="lg:hidden md:hidden grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getProducts(productList, "Winter Garden", false, 2)}
                </div>
                <div className="block lg:mt-6 md:mt-4 mt-2">
                    <Link to="/shop" className={AnchorDesign}>View More</Link>
                </div>
            </section>

            <section className="relative w-full min-h-[20dvh] md:min-h-[50dvh] flex md:items-center items-start justify-center md:justify-end overflow-hidden">
                <img src={getLookPhoto} alt="Sun Goddess - Perena" className="absolute inset-0 h-full w-full object-cover object-left"/>
                <div className="relative flex flex-col justify-center items-center py-10 lg:mr-10 md:mr-8 mr-0">
                    <h1 className="font-['Times_New_Roman',serif] text-white xl:text-7xl md:text-6xl text-5xl py-4">Get This Look</h1>
                    {getProducts(productList, "Sun Goddess", false, 1, "bg-white")}
                </div>
            </section>

            <MediaText mediaType="image" mediaURL={affiliatePhoto} mediaAlt="ImageNotFound" direction="tnp"
            title="Meet Our Affiliate" description="Join our community of creators and earn rewards for sharing looks you love."
            font="font-['Times_New_Roman'] italic font-normal text-7xl sm:py-0 pt-3! pb-12"
            hasButton={true} buttonContent="Explore" bgColor="bg-[#FFFBED]" ratio="6&6"/>

            <section id="newsletter" className="bg-[#841910] text-white flex flex-col justify-center items-center lg:py-12 md:py-9 py-7.5">
                <h1 className="font-['Times_New_Roman',serif] lg:text-5xl text-3xl italic">Subscribe to newsletter</h1>
                <h5 className="font-[OpenSans] lg:text-xl text-lg font-thin">Exclusive Offers: Get access to special promotions and discounts available only to subscribers.</h5>
                <div className="relative md:w-2/5 w-3/4 md:my-8 my-6">
                    <input id="email" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" minLength={2} maxLength={100} placeholder="" className="peer block w-full px-2.5 pb-2.5 pt-5 text-sm border-b-2 border-white focus:ring-0 outline-0" />
                    <label htmlFor="email" className="absolute text-sm duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-left left-2.5
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">Enter email here</label>
                    <span className="w-5 h-5 bg-center bg-no-repeat bg-contain absolute right-0 top-0 translate-y-full cursor-pointer">
                        <img src={sendButton} alt="Send" />
                        <span className="sr-only">Send Email Newsletter</span>
                    </span>
                </div>
            </section>

        </>
    );
}