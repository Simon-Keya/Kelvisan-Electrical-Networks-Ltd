'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// Define a type for the membership tier props
interface MembershipTier {
  title: string;
  description: string;
  benefits: string[];
  icon: React.ReactNode;
  color: string;
}

// Reusable component for a membership card
const MembershipCard = ({ tier, index }: { tier: MembershipTier; index: number }) => (
  <motion.div
    className={`p-8 rounded-2xl shadow-xl border-t-4 border-${tier.color}-500 bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="flex items-center mb-4">
      {/* Icon for the membership tier */}
      <div className={`p-3 rounded-full bg-${tier.color}-100 text-${tier.color}-600 mr-4`}>
        {tier.icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{tier.title}</h3>
    </div>
    <p className="text-gray-600 mb-6 flex-grow">{tier.description}</p>
    
    {/* List of benefits */}
    <ul className="space-y-3 mb-6">
      {tier.benefits.map((benefit, i) => (
        <li key={i} className="flex items-start text-gray-700">
          <span className={`text-${tier.color}-500 mr-3 mt-1`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          {benefit}
        </li>
      ))}
    </ul>
    
    <Link href="/contact" className="mt-auto">
      <button className={`w-full py-3 px-6 rounded-full font-semibold text-white bg-${tier.color}-600 hover:bg-${tier.color}-700 transition`}>
        Learn More
      </button>
    </Link>
  </motion.div>
);

const membershipTiers: MembershipTier[] = [
  {
    title: 'Electrical Network Partner',
    description: 'Aimed at companies and professionals collaborating on large-scale electrical infrastructure and smart grid projects.',
    benefits: [
      'Access to strategic project bids',
      'Priority for sub-contracting opportunities',
      'Exclusive technical training sessions',
      'Joint marketing and networking events',
    ],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'teal',
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
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: 'yellow',
  },
];

const Membership = () => {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="px-6 py-24 bg-white text-center border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-4 text-teal-800"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Become a Kelvisan Member
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8"
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
            <Link href="/contact">
              <button className="px-8 py-4 bg-yellow-400 text-teal-900 font-bold rounded-full shadow-lg transition-all transform hover:scale-105 hover:bg-yellow-300">
                Contact Us to Join
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-teal-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Choose Your Partnership Path
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10">
            {membershipTiers.map((tier, index) => (
              <MembershipCard key={index} tier={tier} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits and Call to Action */}
      <section className="px-6 py-16 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-teal-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Connect?
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-600 mb-8"
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
            <Link href="/contact">
              <button className="px-8 py-4 bg-teal-600 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105 hover:bg-teal-700">
                Start Your Partnership
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Membership;
