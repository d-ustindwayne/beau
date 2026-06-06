import type { ReactElement } from "react"
import logo from "/beau-with-motto-logo.png"
import beautext from '/beau-logo.png'
import { Link } from 'react-router-dom'

export default function Footer(): ReactElement {
  return (
    <footer className="bg-[#7A1C16] text-white font-serif py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 items-start mb-16">

          <div>
            <h2 className="text-2xl tracking-wide uppercase mb-6 font-normal">Shop</h2>
            <ul className="space-y-4 text-gray-200 text-sm font-sans tracking-wide">
              <li><Link to="/shop/all" className="hover:text-white transition">Shop</Link></li>
              <li><Link to="/shop/new" className="hover:text-white transition">New</Link></li>
              <li><Link to="/shop/collections" className="hover:text-white transition">Collection</Link></li>
              <li><Link to="/shop/sale" className="hover:text-white transition">Sale</Link></li>
            </ul>
          </div>


          <div>
            <h2 className="text-2xl tracking-wide uppercase mb-6 font-normal">Help</h2>
            <ul className="space-y-4 text-gray-200 text-sm font-sans tracking-wide">
              <li><Link to="#" className="hover:text-white transition">Customer Service</Link></li>
              <li><Link to="#" className="hover:text-white transition">Refund Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition">Store Locator</Link></li>
              <li><Link to="#" className="hover:text-white transition">Order Status</Link></li>
            </ul>
          </div>


          <div>
            <h2 className="text-2xl tracking-wide uppercase mb-6 font-normal">Company</h2>
            <ul className="space-y-4 text-gray-200 text-sm font-sans tracking-wide">
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-white transition">Terms Of Conditions</Link></li>
              <li><Link to="/affiliate" className="hover:text-white transition">Affiliates</Link></li>
            </ul>
          </div>


          <div>
            <h2 className="text-2xl tracking-wide uppercase mb-6 font-normal">Contact</h2>
            <div className="space-y-6 text-gray-200 text-sm font-sans tracking-wide">
              <div>
                <p className="font-bold text-white mb-1">Email</p>
                <a href="mailto:beau@example.com" className="hover:text-white transition">
                  beau@example.com
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

        <div className="flex flex-col items-center justify-center text-center pb-8 border-b border-b-white">
          <img src={logo} alt="beau" className="object-contain"/>
        </div>

        <div className="pt-8 text-center text-white text-base md:text-lg tracking-wide font-normal">
          &copy; 2026, <img src={beautext} alt="" className="inline object-contain h-6 mb-1.5" />. All rights reserved
        </div>
      </div>
    </footer>
  );
};