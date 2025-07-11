'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaBolt,
  FaFileAlt,
  FaLaptopCode,
  FaNetworkWired,
  FaNewspaper,
  FaUsers,
} from 'react-icons/fa';
import { Hero } from '../components/Hero';
import Subscribe from '../components/Subscribe'; // Import the Subscribe component

// Animation Variants
const containerVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.75,
      staggerChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 12,
    },
  },
};

export default function Homepage() {
  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-teal-50 text-gray-900 scroll-smooth">
      
      {/* Hero Section */}
      <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Hero />
      </motion.div>

      {/* Stats Section */}
      <section className="py-16 px-4 lg:px-24 bg-gradient-to-b from-gray-100 via-white to-sky-100">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Adjust viewport amount for better trigger
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <StatCard value="50+" label="ISP Customers" />
            <StatCard value="4+" label="ISP Centres" />
            <StatCard value="24/7" label="Network Service" />
            <StatCard value="99.9%" label="Uptime Guarantee" />
          </div>
        </motion.div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-16 px-4 lg:px-24 bg-gradient-to-b from-white via-blue-100 to-white border-t border-gray-100">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-teal-700 text-center mb-4">Core Focus Areas</motion.h2>
          <motion.p className="text-gray-800 text-center mb-12 max-w-2xl mx-auto text-lg">
            We focus on transforming Kenya’s digital and energy landscapes through seamless service delivery.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <HighlightCard icon={<FaNetworkWired className="text-4xl text-teal-600" />} title="Networking" description="Broadband access and infrastructure." link="/networking" />
            <HighlightCard icon={<FaBolt className="text-4xl text-yellow-500" />} title="Electrical Solutions" description="Smart grids and renewable energy." link="/electrical" />
            <HighlightCard icon={<FaUsers className="text-4xl text-blue-600" />} title="Membership" description="Collaborate with our vibrant community." link="/membership" />
            <HighlightCard icon={<FaNewspaper className="text-4xl text-red-500" />} title="News" description="Latest innovations and updates." link="/news" />
          </div>
        </motion.div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-teal-50 border-t border-gray-100">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-bold text-teal-700 text-center mb-6">Featured Resources</motion.h2>
          <motion.p className="text-gray-700 text-center mb-12 max-w-2xl mx-auto text-lg">
            Stay informed with guides, policy briefs, and tips for network and software success.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Software Installation Guide',
                description: 'Step-by-step software deployment walkthroughs.',
                link: '/resources',
                icon: <FaLaptopCode />,
              },
              {
                title: 'ICT Policy Briefs',
                description: 'Governance and tech strategy simplified.',
                link: '/resources',
                icon: <FaFileAlt />,
              },
              {
                title: 'Network Optimization Tips',
                description: 'Maximize uptime and reliability.',
                link: '/resources',
                icon: <FaNetworkWired />,
              },
            ].map((res, i) => (
              <motion.div
                key={i}
                variants={cardVariant}
                className="p-6 bg-white rounded-xl border hover:border-teal-400 shadow-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.04 }}
              >
                <div className="text-blue-600 text-3xl mb-4">{res.icon}</div>
                <h3 className="text-xl font-semibold text-teal-700 mb-2">{res.title}</h3>
                <p className="text-gray-600 mb-4">{res.description}</p>
                <Link href={res.link} className="text-sm text-blue-700 hover:underline font-medium">
                  View Resource →
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>


      {/* Newsletter Subscription Section */}
      <section className="py-16 px-4 lg:px-24 bg-gradient-to-br from-blue-50 via-white to-teal-50 border-t border-gray-100">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-extrabold text-teal-800 mb-4">
            Join Our Community
          </motion.h2>
          <motion.p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter for exclusive updates, insights, and special offers directly in your inbox.
          </motion.p>
          <div className="max-w-md mx-auto">
            <Subscribe /> {/* The Subscribe component */}
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        className="relative py-20 px-4 lg:px-32 text-center bg-gradient-to-br from-yellow-100 via-white to-yellow-200 border-t border-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariant}
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400 to-white" />
        <div className="relative z-10">
          <motion.h3 className="text-3xl sm:text-4xl font-extrabold text-teal-800 mb-6">Partner with Kelvisan</motion.h3>
          <motion.p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Join us as we transform smart cities, secure networks, and enable innovation in Kenya.
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <Link href="/contact" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-md transition duration-300"
              >
                Contact Us
              </motion.button>
            </Link>
            <Link href="/about" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-yellow-300 text-blue-900 hover:bg-yellow-400 rounded-lg font-medium shadow-md transition duration-300"
              >
                Join Kelvisan
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

// Stat Card Component
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={cardVariant}
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl border border-blue-100 text-center transition-transform duration-300 hover:-translate-y-1"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-4xl font-bold text-teal-800">{value}</div>
      <div className="text-sm text-gray-700 mt-1">{label}</div>
    </motion.div>
  );
}

// Highlight Card Component
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
      variants={cardVariant}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200 hover:border-teal-400"
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
