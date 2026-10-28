import { Suspense } from "react";
import Navbar from "./Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";
import * as Pages from "../routes.ts";
import LoadingScreen from "./LoadingScreen";
import ScrollToTop from "./ScrollToTop";
import JinnyChat from "./JinnyChat";

export default function App() {
    const currentLocation = useLocation();
    return (<>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-cream text-black font-sans">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-60 focus:px-4 focus:py-2 focus:bg-sand focus:text-black focus:font-semibold focus:shadow-lg">Skip to content</a>
            <Navbar />
            {currentLocation.pathname === "/checkout" ? <></> : <CartSidebar />}
            <main id="main-content" tabIndex={-1} className="grow relative outline-none">
                <Suspense fallback={<LoadingScreen />}>
                    <Routes>
                        <Route path="/" element={<Pages.Index />} />
                        <Route path="/shop" element={<Pages.Shop key={currentLocation.search} />} />
                        <Route path="/contact" element={<Pages.Contact />} />
                        <Route path="/about" element={<Pages.About />} />
                        <Route path="/affiliate" element={<Pages.Affiliate />} />
                        <Route path="/checkout" element={<Pages.Checkout />} />
                        <Route path="/collections" element={<Pages.Collections />} />
                        <Route path="/sale" element={<Pages.Sale />} />
                        <Route path="/customer-service" element={<Pages.CustomerService />} />
                        <Route path="/refund-policy" element={<Pages.RefundPolicy />} />
                        <Route path="/store-locator" element={<Pages.StoreLocator />} />
                        <Route path="/order-status" element={<Pages.OrderStatus />} />
                        <Route path="/privacy-policy" element={<Pages.PrivacyPolicy />} />
                        <Route path="/terms-and-conditions" element={<Pages.Terms />} />
                        <Route path="*" element={<Pages.NotFound />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
            <JinnyChat />
        </div>
    </>)
}
