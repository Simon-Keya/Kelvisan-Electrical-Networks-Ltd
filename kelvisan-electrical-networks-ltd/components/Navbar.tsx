'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-teal-700 shadow-md text-white">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        
        {/* Logo/Title */}
        <Link href="/" className="text-3xl text-black font-extrabold tracking-wide">
          KELVISAN
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-lg font-medium">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/about" className="hover:text-blue-400 transition">About Us</Link>
          <Link href="/services" className="hover:text-blue-400 transition">Services</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3">
          <Link href="/contact">
            <button className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-teal-600 transition duration-300">
              Need Help❓
            </button>
          </Link>
          <Link href="/about">
            <button className="bg-yellow-400 text-teal-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition duration-300 shadow">
              Hire Us
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Icon */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-black" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-black" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-teal-700 text-white px-6 py-4 space-y-4">
          <Link
            href="/about"
            className="block text-lg hover:text-yellow-300 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/services"
            className="block text-lg hover:text-yellow-300 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="block text-lg hover:text-yellow-300 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <div className="flex flex-col gap-3 mt-4">
            <Link href="/contact">
              <button className="w-full border border-white text-white py-2 rounded-full hover:bg-white hover:text-teal-600 transition duration-300">
                Need Help❓
              </button>
            </Link>
            <Link href="/about">
              <button className="w-full bg-yellow-400 text-teal-900 font-semibold py-2 rounded-full hover:bg-yellow-300 transition duration-300 shadow">
                Hire Us
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
