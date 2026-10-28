import type { JSX } from "react";
import logo from "/assets/brand/beau-logo.png";
import beautext from "/assets/brand/beau-logo.png";
import { Link } from "react-router-dom";
import { EMAILS } from "../constants";

const linkClass = "underline-offset-4 decoration-sand hover:text-white hover:underline transition";

export default function Footer(): JSX.Element {
  return (
    <footer className="on-dark bg-beau-footer text-white font-serif py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 items-start mb-16">

          <div>
            <h2 className="text-2xl tracking-wide uppercase mb-6 font-normal">Shop</h2>
            <ul className="space-y-4 text-gray-200 text-sm font-sans tracking-wide">
              <li><Link to="/shop" className={linkClass}>Shop</Link></li>
              <li><Link to="/shop?sort=newest" className={linkClass}>New</Link></li>
              <li><Link to="/collections" className={linkClass}>Collection</Link></li>
              <li><Link to="/sale" className={linkClass}>Sale</Link></li>
            </ul>
          </div>


          <div>
            <h2 className="text-2xl tracking-wide uppercase mb-6 font-normal">Help</h2>
            <ul className="space-y-4 text-gray-200 text-sm font-sans tracking-wide">
              <li><Link to="/customer-service" className={linkClass}>Customer Service</Link></li>
              <li><Link to="/refund-policy" className={linkClass}>Refund Policy</Link></li>
              <li><Link to="/store-locator" className={linkClass}>Store Locator</Link></li>
              <li><Link to="/order-status" className={linkClass}>Order Status</Link></li>
            </ul>
          </div>


          <div>
            <h2 className="text-2xl tracking-wide uppercase mb-6 font-normal">Company</h2>
            <ul className="space-y-4 text-gray-200 text-sm font-sans tracking-wide">
              <li><Link to="/about" className={linkClass}>About Us</Link></li>
              <li><Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className={linkClass}>Terms &amp; Conditions</Link></li>
              <li><Link to="/affiliate" className={linkClass}>Affiliates</Link></li>
            </ul>
          </div>


          <div>
            <h2 className="text-2xl tracking-wide uppercase mb-6 font-normal">Contact</h2>
            <div className="space-y-6 text-gray-200 text-sm font-sans tracking-wide">
              <div>
                <p className="font-bold text-white mb-1">Email</p>
                <a href={`mailto:${EMAILS.support}`} className={linkClass}>
                  {EMAILS.support}
                </a>
              </div>
              <div>
                <p className="font-bold text-white mb-1">Address</p>
                <p className="leading-relaxed">
                  Manukau Institute Of Technology
                </p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col items-center justify-center text-center pb-8 border-b border-b-white/40">
          <img src={logo} alt="beau" width={154} height={74} loading="lazy" className="object-contain"/>
        </div>

        <div className="pt-8 text-center text-white text-base md:text-lg tracking-wide font-normal">
          &copy; 2026, <img src={beautext} alt="beau" loading="lazy" className="inline object-contain h-6 w-auto mb-1.5" />. All rights reserved
        </div>
      </div>
    </footer>
  );
};