'use client';

import { motion } from 'framer-motion';
import { Lightbulb, LineChart, Shield, Sparkles, Sun, Wrench } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

// Define a type for the component's props
interface CardProps {
  children: React.ReactNode;
  delay?: number;
}

// Reusable component for a professional-looking card with motion animation
const Card = ({ children, delay = 0 }: CardProps) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-full flex flex-col transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

// Define a type for the service card props
interface ServiceCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  delay?: number;
}

const ServiceCard = ({ title, desc, icon, delay = 0 }: ServiceCardProps) => (
  <motion.div
    className="p-8 rounded-2xl shadow-lg border-t-4 border-teal-500 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: delay, duration: 0.5 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="flex items-start mb-4 text-teal-600">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-100 mr-4 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  </motion.div>
);

// Map service titles to Lucide icons
const serviceIcons: { [key: string]: React.ReactNode } = {
  'Power Grid Design & Optimization': <Sparkles size={24} />,
  'Energy Audits & Efficiency': <Lightbulb size={24} />,
  'Solar & Renewable Integration': <Sun size={24} />,
  'Smart Meters & Monitoring': <LineChart size={24} />,
  'Industrial & Commercial Wiring': <Wrench size={24} />,
  'Surge Protection & Backup Systems': <Shield size={24} />,
};

const electricalServices = [
  { title: 'Power Grid Design & Optimization', desc: 'Custom electrical grid layouts for commercial, industrial, and residential projects.' },
  { title: 'Energy Audits & Efficiency', desc: 'Cut energy bills and reduce carbon footprints with expert audits and efficiency strategies.' },
  { title: 'Solar & Renewable Integration', desc: 'Smart hybrid systems combining solar panels, battery storage, and grid connections for sustainable power.' },
  { title: 'Smart Meters & Monitoring', desc: 'Digital metering solutions with energy dashboards and automated maintenance alerts.' },
  { title: 'Industrial & Commercial Wiring', desc: 'Safe, compliant, and scalable wiring setups for factories, offices, and commercial plants.' },
  { title: 'Surge Protection & Backup Systems', desc: 'Ensure business continuity and protect valuable assets with UPS, inverters, and comprehensive surge isolation.' },
];

const ElectricalPage = () => {
  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-white py-24 px-6 border-b border-gray-200">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-teal-800 leading-tight tracking-tight"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Powering Progress with<br />Electrical Solutions
          </motion.h1>
          <motion.p
            className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Delivering reliable, scalable, and intelligent electrical infrastructure for businesses and homes across Kenya.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-teal-800">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {electricalServices.map((service, idx) => (
              <ServiceCard
                key={idx}
                title={service.title}
                desc={service.desc}
                icon={serviceIcons[service.title]}
                delay={idx * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-teal-800">Why Choose Kelvisan Electrical?</h2>
          <ul className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-gray-700">
            {[
              'Over 10 years of electrical and energy engineering experience',
              'Certified engineers with ISO and KEBS-compliant systems',
              'Transparent pricing and detailed performance reports',
              '24/7 maintenance, remote monitoring, and smart alerts',
              'Trusted by hospitals, malls, SMEs, and manufacturing plants',
            ].map((reason, i) => (
              <motion.li
                key={i}
                className="flex items-start bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                viewport={{ once: true }}
              >
                <span className="text-teal-500 text-2xl mr-4 flex-shrink-0">
                  <Lightbulb size={24} />
                </span>
                <p className="font-medium text-lg leading-relaxed">{reason}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto text-center max-w-6xl">
          <h2 className="text-4xl font-bold mb-16 text-teal-800">Impact in Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              ['20+', 'Projects Completed'],
              ['10+', 'Industries Served'],
              ['15%', 'Avg. Energy Savings'],
              ['99.9%', 'Uptime Guarantee'],
            ].map(([value, label], i) => (
              <Card key={i} delay={i * 0.1}>
                <div className="text-5xl md:text-6xl font-extrabold text-teal-700">{value}</div>
                <p className="mt-2 text-gray-600 text-lg font-medium">{label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-white py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-teal-800">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              'Site Survey & Consultation',
              'System Design & Engineering',
              'Installation & Testing',
              'Support & Maintenance',
            ].map((step, index) => (
              <motion.div
                key={index}
                className="relative p-8 rounded-2xl bg-gray-50 shadow-md border border-gray-200"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="absolute -top-4 left-1/2 -ml-4 w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <p className="mt-6 font-semibold text-lg">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="bg-yellow-300 text-black py-20 text-center">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold mb-4 tracking-tight">Ready to Power Your Project?</h3>
          <p className="mb-8 text-lg opacity-80">Book a free consultation or site survey with our certified team today.</p>
          <Link href="/contact" passHref>
            <motion.button
              className="bg-white text-teal-700 font-semibold px-10 py-4 rounded-full shadow-lg transition-all transform hover:scale-105 hover:bg-teal-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us Now
            </motion.button>
          </Link>
        </div>
      </footer>
    </main>
  );
};

export default ElectricalPage;
