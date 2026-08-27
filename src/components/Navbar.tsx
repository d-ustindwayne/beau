import logo from "/beau-logo.png";
import { useState, type JSX } from "react";
import { Link } from "react-router-dom";

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#841910] text-white font-serif px-4 sm:px-6 lg:px-8 pt-6 pb-3 md:pb-5">
      <div className="max-w-7xl mx-auto flex md:flex-col flex-row items-center md:justify-center justify-between text-center">
        
        <div className="md:mb-5 mb-2 shrink-0">
          <Link to="/" className="inline-block transition hover:drop-shadow-mist-200">
            <img src={logo} alt="beau" className="h-16 md:h-16 object-contain" />
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center space-x-10 text-2xl font-normal tracking-wide">
          <Link to="/shop" className="hover:text-gray-300 transition duration-200">Shop</Link>
          <Link to="/about" className="hover:text-gray-300 transition duration-200">About</Link>
          <Link to="/contact" className="hover:text-gray-300 transition duration-200">Contact</Link>
          <Link to="/affiliate" className="hover:text-gray-300 transition duration-200">Affiliate</Link>
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none transition"
            aria-label="Toggle navigation menu"
          >
            <svg className="h-7 w-7 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isOpen? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

      </div>

      {isOpen && (
        <div className="md:hidden mt-6 pt-6 border-t border-[#9c251b] text-xl text-center space-y-4 pb-2">
          <Link to="/shop" className="block text-start ms-3 hover:text-gray-300 transition py-1">Shop</Link>
          <Link to="/about" className="block text-start ms-3 hover:text-gray-300 transition py-1">About</Link>
          <Link to="/contact" className="block text-start ms-3 hover:text-gray-300 transition py-1">Contact</Link>
          <Link to="/affiliate" className="block text-start ms-3 hover:text-gray-300 transition py-1">Affiliate</Link>
        </div>
      )}
    </nav>
  );
}