'use client';

import Link from 'next/link';
import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 bg-teal-950 text-base-content py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">

          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">KELVISAN ELECTRICAL NETWORKS LTD</h2>
            <p className="text-sm max-w-xs">
              Leading experts in electrical networking and professional software development solutions.
              Delivering innovation, reliability, and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary">
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: <a href="mailto:info@kelvinsan.com" className="hover:text-primary">info@kelvinsan.com</a></li>
              <li>Phone: <a href="tel:+254711762682" className="hover:text-primary">+ 254711762682</a></li>
              <li>Address: Nairobi, Kenya</li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary">
                <FaLinkedin />
              </a>
              <a href="mailto:info@kelvinsan.com" className="text-2xl hover:text-primary">
                <FaEnvelope />
              </a>
              <a href="https://wa.me/254711762682" target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-primary">
                <FaWhatsapp />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="text-center mt-10 border-t pt-6 text-sm">
          © {currentYear} Kelvinsan Electrical Networks Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
