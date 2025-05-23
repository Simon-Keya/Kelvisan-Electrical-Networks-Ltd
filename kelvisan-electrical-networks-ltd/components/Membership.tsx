'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Membership = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Join Kelvisan Membership Program
        </motion.h2>
        <p className="text-lg md:text-xl mb-10">
          Become part of a dynamic community advancing Kenya’s electrical and software technology infrastructure. 
          As a member, gain access to tools, training, support, and strategic collaborations.
        </p>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-6 bg-teal-100 dark:bg-gray-800 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Electrical Network Partners</h3>
            <p>
              Collaborate on grid systems, smart power installations, and infrastructure expansion projects.
            </p>
          </div>
          <div className="p-6 bg-yellow-100 dark:bg-gray-700 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Software Development Allies</h3>
            <p>
              Work with us on innovative software solutions for energy, IoT, and smart systems integration.
            </p>
          </div>
        </motion.div>

        <div className="mt-10">
          <Link href="/contact">
            <button className="px-6 py-3 bg-yellow-400 text-teal-900 font-semibold rounded-full hover:bg-yellow-300 transition">
              Become a Member
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Membership;
