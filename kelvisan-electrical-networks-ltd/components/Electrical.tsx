'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const ElectricalPage = () => {
  return (
    <main className="bg-white text-gray-800 dark:bg-gray-900 dark:text-white min-h-screen pt-24 px-6 lg:px-24">
      {/* Hero Section */}
      <section className="text-center mb-20">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-teal-700 dark:text-yellow-400"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Electrical Solutions
        </motion.h1>
        <motion.p
          className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Powering progress with reliable, scalable, and intelligent electrical infrastructure across Kenya.
        </motion.p>
      </section>

      {/* Services Section */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-teal-700 dark:text-yellow-400">What We Offer</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Power Grid Design & Optimization', desc: 'Custom electrical grid layouts for commercial, industrial, and residential projects.' },
            { title: 'Energy Audits & Efficiency', desc: 'Cut energy bills and reduce carbon footprints with expert audits.' },
            { title: 'Solar & Renewable Integration', desc: 'Smart hybrid systems combining solar, batteries, and grid connections.' },
            { title: 'Smart Meters & Monitoring', desc: 'Digital metering, energy dashboards, and maintenance alerts.' },
            { title: 'Industrial & Commercial Wiring', desc: 'Safe, compliant wiring setups for factories, offices, and plants.' },
            { title: 'Surge Protection & Backup Systems', desc: 'Ensure uptime with UPS, inverters, and surge isolators.' },
          ].map(({ title, desc }, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-2 text-teal-600 dark:text-yellow-300">{title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-teal-50 dark:bg-teal-900 rounded-xl p-10 mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-teal-800 dark:text-yellow-300">Why Choose Kelvisan Electrical?</h2>
        <ul className="grid md:grid-cols-2 gap-6 text-gray-700 dark:text-gray-100 text-lg font-medium">
          <li>✅ Over 10 years of engineering experience</li>
          <li>✅ Certified in local and international safety standards</li>
          <li>✅ Transparent pricing and energy reports</li>
          <li>✅ 24/7 maintenance and remote monitoring</li>
          <li>✅ Scalable infrastructure for all industries</li>
        </ul>
      </section>

      {/* Our Process */}
      <section className="mb-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-teal-700 dark:text-yellow-400 text-center">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            'Site Survey & Consultation',
            'System Design & Engineering',
            'Installation & Testing',
            'Support & Maintenance',
          ].map((step, index) => (
            <motion.div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-extrabold text-teal-700 dark:text-yellow-400 mb-2">{index + 1}</div>
              <p className="font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center mb-24">
        <h3 className="text-2xl font-bold mb-4 text-teal-700 dark:text-yellow-400">Ready to Power Your Project?</h3>
        <p className="mb-6 text-gray-600 dark:text-gray-300">
          Book a site survey or virtual consultation with our certified team.
        </p>
        <Link href="/contact">
          <button className="bg-yellow-400 text-teal-900 px-6 py-3 font-semibold rounded-full hover:bg-yellow-300 transition shadow">
            Contact Us Today
          </button>
        </Link>
      </section>
    </main>
  );
};

export default ElectricalPage;
