'use client';

import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const arrow = <HiOutlineArrowNarrowRight className="inline-block mr-1 text-yellow-400" size={16} />;

  return (
    <footer className="bg-teal-950 text-teal-100 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Company Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-yellow-400">KELVISAN ELECTRICAL NETWORKS LTD</h2>
          <p className="text-sm leading-relaxed text-teal-100">
            Leading experts in electrical networking and professional software development solutions.
            Delivering innovation, reliability, and excellence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>{arrow}<Link href="/" className="hover:text-yellow-400">Home</Link></li>
            <li>{arrow}<Link href="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li>{arrow}<Link href="/services" className="hover:text-yellow-400">Services</Link></li>
            <li>{arrow}<Link href="/networking" className="hover:text-yellow-400">Networking</Link></li>
            <li>{arrow}<Link href="/electrical" className="hover:text-yellow-400">Electrical</Link></li>
            <li>{arrow}<Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>{arrow}<Link href="/resources" className="hover:text-yellow-400">Networking Optimization</Link></li>
            <li>{arrow}<Link href="/resources" className="hover:text-yellow-400">Peering Guidelines</Link></li>
            <li>{arrow}<Link href="/resources" className="hover:text-yellow-400">ICT Policy Briefs</Link></li>
          </ul>
          <div className="mt-4">
            <Link href="/resources">
              <button className="bg-yellow-400 text-teal-900 font-semibold text-sm px-4 py-2 rounded hover:bg-yellow-300 transition">
                View All Resources →
              </button>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-yellow-300 mb-3">Contact</h3>
          <ul className="text-sm space-y-1 text-teal-100">
            <li>Email: <a href="mailto:kelvisanelectricals@gmail.com" className="hover:text-yellow-400">kelvisanelectricals@gmail.com</a></li>
            <li>Phone: <a href="tel:+254711762682" className="hover:text-yellow-400">+254 711 762 682</a></li>
            <li>Address: Nairobi, Kenya</li>
          </ul>
          <div className="flex space-x-4 mt-4 text-yellow-300">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 text-xl"><FaLinkedin /></a>
            <a href="mailto:kelvisanelectricals@gmail.com" className="hover:text-yellow-400 text-xl"><FaEnvelope /></a>
            <a href="https://wa.me/254711762682" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 text-xl"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 pt-6 border-t border-teal-800 text-md text-white">
        © {currentYear} Kelvisan Electrical Networks Ltd. All rights reserved.
      </div>
    </footer>
  );
};
