'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaBolt,
  FaFileAlt,
  FaLaptopCode,
  FaNetworkWired,
  FaNewspaper,
  FaUsers
} from 'react-icons/fa';
import { Hero } from '../components/Hero';

export default function Homepage() {
  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-teal-50 text-gray-900 scroll-smooth">
      {/* Hero Section */}
      <motion.div>
        <Hero />
      </motion.div>

      {/* Stats Section */}
      <section className="pt-24 pb-20 px-6 lg:px-24 bg-gradient-to-b from-gray-50 via-white to-teal-50">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <StatItem value="50+" label="ISP Customers" />
            <StatItem value="4+" label="ISP Centres" />
            <StatItem value="24/7" label="Network Service" />
            <StatItem value="99.9%" label="Uptime Guarantee" />
          </div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="pt-24 pb-20 px-6 lg:px-24 bg-gradient-to-b from-white via-yellow-50 to-white border-t">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-teal-700 text-center mb-4">Core Focus Areas</h2>
          <p className="text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Our services cover critical areas that shape modern living—energy, internet, technology, and collaboration.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <HighlightCard
              icon={<FaNetworkWired className="text-3xl text-teal-600 mb-2" />}
              title="Networking"
              description="Reliable broadband access and national digital infrastructure."
              link="/services#networking"
            />
            <HighlightCard
              icon={<FaBolt className="text-3xl text-yellow-500 mb-2" />}
              title="Electrical Solutions"
              description="Smart energy grids, power system design, and renewables."
              link="/services#electrical"
            />
            <HighlightCard
              icon={<FaUsers className="text-3xl text-blue-600 mb-2" />}
              title="Membership"
              description="Join a visionary community transforming infrastructure."
              link="/membership"
            />
            <HighlightCard
              icon={<FaNewspaper className="text-3xl text-red-500 mb-2" />}
              title="News"
              description="Stay updated with our innovations and national contributions."
              link="/news"
            />
          </div>
        </motion.div>
      </section>

      {/* Resources Section */}
      <section className="py-24 px-6 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-teal-50 border-t">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-teal-700 mb-6 text-center">Featured Resources</h2>
          <p className="text-gray-700 text-center mb-12 max-w-3xl mx-auto">
            Explore curated resources to help you stay ahead—whether you’re implementing software, planning network infrastructure, or shaping ICT policy.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Software Installation Guide',
                description: 'Deploy infrastructure software with step-by-step instructions.',
                link: '/resources',
                icon: <FaLaptopCode />,
              },
              {
                title: 'ICT Policy Briefs',
                description: 'Understand governance and tech strategy in the Kenyan digital space.',
                link: '/resources',
                icon: <FaFileAlt />,
              },
              {
                title: 'Network Optimization Tips',
                description: 'Increase network uptime and efficiency with proven strategies.',
                link: '/resources',
                icon: <FaNetworkWired />,
              },
            ].map((resource, i) => (
              <motion.div
                key={i}
                className="p-6 bg-white border border-teal-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-blue-600 text-2xl mb-2">{resource.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Link href={resource.link} className="text-sm text-blue-700 hover:underline font-medium">
                  View Resource →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        className="relative py-24 px-6 lg:px-32 text-center overflow-hidden bg-gradient-to-br from-yellow-100 via-white to-yellow-200 border-t"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400 to-white" />

        <div className="relative z-10">
          <motion.h3
            className="text-4xl font-extrabold text-teal-800 mb-6 tracking-tight"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Partner with Kelvisan
          </motion.h3>
          <motion.p
            className="text-gray-700 text-lg mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We are revolutionizing Kenya’s digital and energy landscape. From smart cities to secure networks—let’s build the future together.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-5"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/contact">
              <button className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-md font-medium shadow-md hover:shadow-lg transition duration-300 transform hover:scale-105">
                Contact Us
              </button>
            </Link>
            <Link href="/about">
              <button className="px-6 py-3 bg-yellow-300 text-blue-900 rounded-md font-medium shadow-md hover:bg-yellow-400 transition duration-300 transform hover:scale-105">
                Join Kelvisan
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}

// Reusable Stat Component
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="text-center"
      whileHover={{ scale: 1.07 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div className="text-4xl font-bold text-teal-700">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </motion.div>
  );
}

// Reusable Highlight Card
function HighlightCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 border hover:border-teal-300"
      whileHover={{ scale: 1.03 }}
    >
      <div className="mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-teal-700 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <Link href={link} className="text-sm text-blue-700 hover:underline font-medium">
        Learn more →
      </Link>
    </motion.div>
  );
}
