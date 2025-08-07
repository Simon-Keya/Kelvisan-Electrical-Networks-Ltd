'use client';

import { motion } from 'framer-motion';
import { Code, Router, Zap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Define a type for the membership tier props
interface MembershipTier {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
  color: 'teal' | 'blue' | 'amber';
}

// Reusable component for a membership card
const MembershipCard = ({ tier, index }: { tier: MembershipTier; index: number }) => {
  // Use a map to get the correct Tailwind color class names
  const colorClasses = {
    teal: {
      border: 'border-teal-500',
      bgIcon: 'bg-teal-100',
      textIcon: 'text-teal-600',
      textButton: 'text-white',
      bgButton: 'bg-teal-600 hover:bg-teal-700',
      textBullet: 'text-teal-500',
    },
    blue: {
      border: 'border-blue-500',
      bgIcon: 'bg-blue-100',
      textIcon: 'text-blue-600',
      textButton: 'text-white',
      bgButton: 'bg-blue-600 hover:bg-blue-700',
      textBullet: 'text-blue-500',
    },
    amber: {
      border: 'border-amber-500',
      bgIcon: 'bg-amber-100',
      textIcon: 'text-amber-600',
      textButton: 'text-white',
      bgButton: 'bg-amber-600 hover:bg-amber-700',
      textBullet: 'text-amber-500',
    },
  };

  const colors = colorClasses[tier.color];

  return (
    <motion.div
      className={`p-8 rounded-2xl shadow-xl ${colors.border} bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col border-t-4`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <div className={`p-3 rounded-full ${colors.bgIcon} ${colors.textIcon} mr-4`}>
          {tier.icon}
        </div>
        <h3 className="text-2xl font-bold text-gray-800">{tier.title}</h3>
      </div>
      <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{tier.description}</p>
      
      {/* List of benefits */}
      <ul className="space-y-3 mb-6">
        {tier.benefits.map((benefit, i) => (
          <motion.li
            key={i}
            className="flex items-start text-gray-700"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
            viewport={{ once: true }}
          >
            <span className={`${colors.textBullet} mr-3 mt-1`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {benefit}
          </motion.li>
        ))}
      </ul>
      
      <Link href="/contact" passHref className="mt-auto">
        <motion.button
          className={`w-full py-3 px-6 rounded-full font-semibold ${colors.textButton} ${colors.bgButton} shadow-md transition-all transform hover:scale-105`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More
        </motion.button>
      </Link>
    </motion.div>
  );
};

const membershipTiers: MembershipTier[] = [
  {
    title: 'Electrical Partner',
    description: 'Aimed at companies and professionals collaborating on large-scale electrical infrastructure and smart grid projects.',
    benefits: [
      'Access to strategic project bids',
      'Priority for sub-contracting opportunities',
      'Exclusive technical training sessions',
      'Joint marketing and networking events',
    ],
    icon: <Zap size={24} />,
    color: 'teal',
  },
  {
    title: 'Networking Partner',
    description: 'For businesses and professionals specializing in network installations, wireless systems, and data security.',
    benefits: [
      'Joint ventures on IT infrastructure projects',
      'Access to our client network',
      'Technical support and resource sharing',
      'Collaborative R&D on new technologies',
    ],
    icon: <Router size={24} />,
    color: 'blue',
  },
  {
    title: 'Software Development Ally',
    description: 'For innovators and developers specializing in software solutions for energy management, IoT, and smart systems.',
    benefits: [
      'Collaboration on R&D projects',
      'Access to a secure API and development sandbox',
      'Mentorship from our senior engineers',
      'Showcase your solutions on our platform',
    ],
    icon: <Code size={24} />,
    color: 'amber',
  },
];

const Membership = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="px-6 py-24 bg-white text-center border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold mb-4 text-teal-800 leading-tight tracking-tight"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Become a Kelvisan Partner
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            Join a dynamic community of innovators and professionals dedicated to advancing Kenya’s technology infrastructure.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/contact" passHref>
              <motion.button
                className="px-8 py-4 bg-teal-600 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105 hover:bg-teal-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Us to Join
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16 text-teal-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Choose Your Partnership Path
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {membershipTiers.map((tier, index) => (
              <MembershipCard key={index} tier={tier} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits and Call to Action */}
      <section className="px-6 py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-4 text-teal-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Connect?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            We are looking for collaborators who share our vision. Let’s build the future together.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/contact" passHref>
              <motion.button
                className="px-8 py-4 bg-teal-600 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105 hover:bg-teal-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Partnership
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Membership;
