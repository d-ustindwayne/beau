import logo from "/assets/brand/beau-logo.png";
import { useState, type JSX } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/affiliate", label: "Affiliate" },
];

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-1 transition-colors duration-200 hover:text-sand after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-sand after:transition-all after:duration-300 ${
    isActive ? "text-sand after:w-full" : "after:w-0 hover:after:w-full"
  }`;

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block text-start ps-3 py-2 border-s-2 transition-colors ${isActive ? "border-sand text-sand" : "border-transparent hover:text-sand"}`;

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav aria-label="Main" className="on-dark bg-beau text-white font-serif px-4 sm:px-6 lg:px-8 pt-6 pb-3 md:pb-5">
      <div className="max-w-7xl mx-auto flex md:flex-col flex-row items-center md:justify-center justify-between text-center">

        <div className="md:mb-5 mb-2 shrink-0">
          <Link to="/" onClick={closeMenu} className="inline-block transition hover:drop-shadow-mist-200">
            <img src={logo} alt="beau – home" width={154} height={74} className="h-16 w-auto object-contain" />
          </Link>
        </div>

        <ul className="hidden md:flex items-center justify-center space-x-10 text-2xl font-normal tracking-wide">
          {navLinks.map((link) => (
            <li key={link.to}><NavLink to={link.to} className={desktopLinkClass}>{link.label}</NavLink></li>
          ))}
        </ul>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center size-11 -me-2 text-white transition"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-7 w-7 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isOpen? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

      </div>

      {isOpen && (
        <ul id="mobile-menu" className="md:hidden mt-4 pt-4 border-t border-white/20 text-xl space-y-1 pb-2 animate-fade-in">
          {navLinks.map((link) => (
            <li key={link.to}><NavLink to={link.to} onClick={closeMenu} className={mobileLinkClass}>{link.label}</NavLink></li>
          ))}
        </ul>
      )}
    </nav>
  );
}
