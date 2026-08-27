import { Suspense } from "react";
import Navbar from "./Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";
import * as Pages from "../routes.ts";
import LoadingScreen from "./LoadingScreen";

export default function App() {
    const currentLocation = useLocation();
    return (<>
        <div className="flex flex-col min-h-screen bg-[#FFFBED]">
            <Navbar />
            {currentLocation.pathname === "/checkout" ? <></> : <CartSidebar />}
            <main className="grow relative">
                <Suspense fallback={<LoadingScreen />}>
                    <Routes>
                        <Route path="/" element={<Pages.Index />} />
                        <Route path="/shop" element={<Pages.Shop />} />
                        <Route path="/contact" element={<Pages.Contact />} />
                        <Route path="/about" element={<Pages.About />} />
                        <Route path="/affiliate" element={<Pages.Affiliate />} />
                        <Route path="/checkout" element={<Pages.Checkout />} />
                        {/* <Route path="/privacy-policy" element={<Pages.PrivacyPolicy />} />
                    <Route path="/terms-and-condition" element={<Pages.TermsAndCondition />} />
                    <Route path="/affiliates" element={<Pages.Affiliates />} /> */} {/* Unimplemented Pages */}
                    </Routes>
                </Suspense>
            </main>
            <Footer />
        </div>
    </>)
}