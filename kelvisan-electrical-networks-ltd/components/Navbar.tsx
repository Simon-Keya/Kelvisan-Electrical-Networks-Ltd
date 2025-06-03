'use client';

import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-teal-800 text-white shadow-md transition-all duration-300 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <Link href="/" className="flex flex-col text-white leading-tight tracking-tight space-y-[-2px]">
  <span className="text-lg lg:text-2xl font-black tracking-tight font-[Oswald] text-yellow-400 ">
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
          {['Home', 'About', 'Services', 'Electrical', 'Networking', 'Resources', 'Contact'].map((label, idx) => (
            <Link
              key={idx}
              href={`/${label.toLowerCase().replace(/\s/g, '') === 'home' ? '' : label.toLowerCase().replace(/\s/g, '')}`}
              className="hover:text-yellow-400 transition duration-200"
            >
              {label}
            </Link>
          ))}
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
            {['Home', 'About', 'Services', 'Electrical', 'Networking', 'Resources', 'Contact'].map((label, idx) => (
              <Link
                key={idx}
                href={`/${label.toLowerCase().replace(/\s/g, '') === 'home' ? '' : label.toLowerCase().replace(/\s/g, '')}`}
                onClick={() => setIsMenuOpen(false)}
                className="block hover:bg-teal-700 px-3 py-2 rounded transition duration-200"
              >
                {label}
              </Link>
            ))}
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
