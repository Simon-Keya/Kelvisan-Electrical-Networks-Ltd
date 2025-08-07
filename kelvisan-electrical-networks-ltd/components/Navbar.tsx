'use client';

import { Bars3Icon, ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to handle scroll-based transparency
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled more than 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    // Add event listener on component mount
    window.addEventListener('scroll', handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Class string for the navbar to handle transparency and animations
  const navClasses = `fixed top-0 left-0 w-full z-50 text-white shadow-md transition-all duration-300 ease-in-out
    ${isScrolled ? 'bg-teal-800 bg-opacity-75 backdrop-blur-sm' : 'bg-teal-800 bg-opacity-95'}`;

  // Helper function to toggle services menu on mobile with explicit type
  const handleServicesToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsServicesOpen(!isServicesOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link href="/" className="flex flex-col text-white leading-tight tracking-tight space-y-[-2px]">
          <span className="text-lg lg:text-2xl font-black tracking-tight font-[Oswald] text-yellow-400">
            KELVISAN
          </span>
          <span className="text-[7px] lg:text-xs font-semibold text-teal-200 uppercase">
            Electrical Networks Ltd
          </span>
          <span className="text-[5px] lg:text-xs font-medium text-yellow-200 italic">
            Empowering your future with reliable solutions
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm lg:text-base font-medium">
          {['Home', 'About', 'Resources', 'Contact'].map((label, idx) => (
            <Link
              key={idx}
              href={`/${label.toLowerCase() === 'home' ? '' : label.toLowerCase()}`}
              className="hover:text-yellow-400 transition duration-200"
            >
              {label}
            </Link>
          ))}
          {/* Services Dropdown */}
          <div className="relative group">
            <button className="flex items-center hover:text-yellow-400 transition duration-200">
              Services
              <ChevronDownIcon className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-3 hidden group-hover:block bg-teal-700 shadow-lg rounded-md overflow-hidden transition-all duration-300 ease-in-out transform scale-y-0 origin-top group-hover:scale-y-100">
              <Link href="/electrical" className="block px-4 py-2 text-sm text-white hover:bg-teal-600 transition duration-200">
                Electrical
              </Link>
              <Link href="/networking" className="block px-4 py-2 text-sm text-white hover:bg-teal-600 transition duration-200">
                Networking
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact">
            <button className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-teal-800 transition duration-300">
              Need Help❓
            </button>
          </Link>
          <Link href="/about">
            <button className="bg-yellow-400 text-teal-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition duration-300 shadow">
              Hire Us
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden focus:outline-none">
          {isMenuOpen ? (
            <XMarkIcon className="w-7 h-7 text-white" />
          ) : (
            <Bars3Icon className="w-7 h-7 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-teal-800 text-white px-6 py-6 space-y-5 transition-all duration-300 border-t border-teal-700">
          <div className="space-y-3 text-lg font-medium">
            {['Home', 'About', 'Resources', 'Contact'].map((label, idx) => (
              <Link
                key={idx}
                href={`/${label.toLowerCase() === 'home' ? '' : label.toLowerCase()}`}
                onClick={handleMobileLinkClick}
                className="block hover:bg-teal-700 px-3 py-2 rounded transition duration-200"
              >
                {label}
              </Link>
            ))}
            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={handleServicesToggle}
                className="flex items-center justify-between w-full px-3 py-2 rounded hover:bg-teal-700 transition duration-200"
              >
                Services
                <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isServicesOpen && (
                <div className="mt-2 pl-4 border-l border-teal-600 space-y-1">
                  <Link href="/electrical" onClick={handleMobileLinkClick} className="block px-3 py-2 text-sm text-white hover:bg-teal-700 transition duration-200">
                    Electrical
                  </Link>
                  <Link href="/networking" onClick={handleMobileLinkClick} className="block px-3 py-2 text-sm text-white hover:bg-teal-700 transition duration-200">
                    Networking
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-teal-600 pt-4 space-y-3">
            <Link href="/contact">
              <button className="w-full border border-white text-white py-2 rounded-full hover:bg-white hover:text-teal-800 transition duration-300">
                Need Help❓
              </button>
            </Link>
            <Link href="/about">
              <button className="w-full bg-yellow-400 text-teal-900 font-semibold py-2 rounded-full hover:bg-yellow-300 transition shadow">
                Hire Us
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
