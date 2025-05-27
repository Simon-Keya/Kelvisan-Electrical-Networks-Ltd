'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-teal-950 shadow-md text-white transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-3xl font-extrabold tracking-wide text-white">
          KELVISAN
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex gap-10 text-md font-medium">
          <Link href="/" className="hover:text-blue-400 transition">Home</Link>
          <Link href="/about" className="hover:text-blue-400 transition">About Us</Link>
          <Link href="/services" className="hover:text-blue-400 transition">Services</Link>
          <Link href="/contact" className="hover:text-blue-400 transition">Contact</Link>
          <Link href="/news" className="hover:text-yellow-300 transition">News</Link>
          <Link href="/resources" className="hover:text-yellow-300 transition">Resources</Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/contact">
            <button className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-teal-600 transition">
              Need Help❓
            </button>
          </Link>
          <Link href="/about">
            <button className="bg-yellow-400 text-teal-900 font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition shadow">
              Hire Us
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-black" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-black" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-teal-700 text-white px-6 py-4 space-y-4 transition-colors duration-300">
          <Link href="/about" onClick={() => setIsMenuOpen(false)} className="block text-lg hover:text-yellow-300">About Us</Link>
          <Link href="/services" onClick={() => setIsMenuOpen(false)} className="block text-lg hover:text-yellow-300">Services</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block text-lg hover:text-yellow-300">Contact</Link>
          <Link href="/news" onClick={() => setIsMenuOpen(false)} className="block text-lg hover:text-yellow-300">News</Link>
          <Link href="/resources" onClick={() => setIsMenuOpen(false)} className="block text-lg hover:text-yellow-300">Resources</Link>

          <div className="flex flex-col gap-3 mt-4">
            <Link href="/contact">
              <button className="w-full border border-white text-white py-2 rounded-full hover:bg-white hover:text-teal-600 transition">
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
