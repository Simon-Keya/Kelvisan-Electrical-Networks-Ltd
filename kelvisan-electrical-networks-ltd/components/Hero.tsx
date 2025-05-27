'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Typewriter } from 'react-simple-typewriter';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-16 shadow-lg border-b-4 border-blue-100 overflow-hidden">

      {/* ✅ Background Image Wrapper */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/hero.jpg"
          alt="Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* ✅ Full-width Centered Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full px-6 md:px-12 text-center text-blue-700 space-y-8"
      >
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-blue-600 drop-shadow-lg">
          Empowering Your Future with Reliable Networks and Innovative Software
        </h1>

        <h2 className="text-2xl md:text-4xl font-semibold text-black">
          We specialize in{' '}
          <span className="text-white">
            <Typewriter
              words={[
                'Electrical Installations',
                'Software Development',
                'CCTV & Security Systems',
                'Smart Networking Solutions',
                'Power Backup Systems',
                'IT Infrastructure Management',
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </h2>

        <p className="text-white text-lg md:text-2xl max-w-5xl mx-auto">
          At <span className="font-semibold text-blue-500">KELVISAN ELECTRICAL NETWORKS LTD</span>, we design, implement, and manage top-quality electrical networking and software solutions tailored to elevate your business and ensure long-term efficiency.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            href="/services"
            className="px-8 py-4 rounded-lg bg-blue-500 text-black font-semibold hover:bg-blue-500 transition duration-300 shadow-md text-lg"
          >
            Explore Services
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 rounded-lg border-2 border-black text-black font-semibold hover:bg-blue-500 hover:text-black transition duration-300 shadow-md text-lg"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>

    </section>
  );
};
