'use client';

import { motion } from 'framer-motion';
import { Activity, Cable, Globe, Server, ShieldCheck, Wifi } from 'lucide-react';
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
  'Structured Cabling': <Cable size={24} />,
  'Wireless Networking': <Wifi size={24} />,
  'Firewall & Security': <ShieldCheck size={24} />,
  'Network Monitoring': <Activity size={24} />,
  'VPN Setup': <Globe size={24} />,
  'Server Room Setup': <Server size={24} />,
};

const networkingServices = [
  { title: "Structured Cabling", desc: "Installation of Ethernet, fiber optics, patch panels, and cable trays." },
  { title: "Wireless Networking", desc: "Enterprise Wi-Fi planning, installation, and optimization." },
  { title: "Firewall & Security", desc: "Deployment of firewalls, VLANs, and access control policies." },
  { title: "Network Monitoring", desc: "Proactive monitoring and performance analytics to minimize downtimes." },
  { title: "VPN Setup", desc: "Secure VPN access for remote teams and hybrid work models." },
  { title: "Server Room Setup", desc: "Rack installation, cooling design, power management, and security." },
];

export default function Networking() {
  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-yellow-300 py-24 px-6 border-b border-gray-200">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold text-teal-800 leading-tight tracking-tight"
          >
            Networking Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-600"
          >
            We design, install, secure, and maintain efficient networking systems for businesses, schools, and public institutions across Kenya.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-teal-800">Our Networking Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {networkingServices.map((service, idx) => (
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

      {/* Why Networking Matters */}
      <section className="px-6 py-20 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-teal-800">Why Reliable Networking Is Essential</h2>
          <ul className="grid md:grid-cols-2 gap-8 text-gray-700">
            <motion.li
              className="flex items-start bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-teal-500 text-2xl mr-4 flex-shrink-0">
                <Activity size={24} />
              </span>
              <div>
                <strong className="text-lg font-semibold text-teal-700">Business Continuity:</strong>
                <p className="text-gray-600 leading-relaxed">Avoid downtimes with stable LAN/WAN infrastructure.</p>
              </div>
            </motion.li>
            <motion.li
              className="flex items-start bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-teal-500 text-2xl mr-4 flex-shrink-0">
                <ShieldCheck size={24} />
              </span>
              <div>
                <strong className="text-lg font-semibold text-teal-700">Cybersecurity:</strong>
                <p className="text-gray-600 leading-relaxed">Protect your data through structured and secured networks.</p>
              </div>
            </motion.li>
            <motion.li
              className="flex items-start bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-teal-500 text-2xl mr-4 flex-shrink-0">
                <Globe size={24} />
              </span>
              <div>
                <strong className="text-lg font-semibold text-teal-700">Remote Access:</strong>
                <p className="text-gray-600 leading-relaxed">Empower your teams with VPN and cloud-based solutions.</p>
              </div>
            </motion.li>
            <motion.li
              className="flex items-start bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-200"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-teal-500 text-2xl mr-4 flex-shrink-0">
                <Server size={24} />
              </span>
              <div>
                <strong className="text-lg font-semibold text-teal-700">Scalability:</strong>
                <p className="text-gray-600 leading-relaxed">We future-proof your network for growing needs.</p>
              </div>
            </motion.li>
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-teal-800">What Our Clients Say</h2>
          <div className="grid sm:grid-cols-2 gap-8">
            <Card delay={0.1}>
              <p className="text-lg italic leading-relaxed text-gray-700">
                &quot;Kelvisan transformed our outdated infrastructure into a seamless hybrid-ready system. Zero downtime since.&quot;
              </p>
              <p className="mt-6 font-semibold text-teal-700">
                — ICT Director, Nairobi Academy
              </p>
            </Card>
            <Card delay={0.2}>
              <p className="text-lg italic leading-relaxed text-gray-700">
                &quot;Their network security configuration saved us from multiple intrusion attempts. Highly recommended!&quot;
              </p>
              <p className="mt-6 font-semibold text-teal-700">
                — CIO, Coastal Bank Kenya
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="bg-yellow-300 text-black py-20 text-center">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-4xl font-bold mb-4 tracking-tight">Ready to Upgrade Your Network?</h3>
          <p className="mb-8 text-lg opacity-80">Book a free consultation or site survey with our certified team today.</p>
          <Link href="/contact" passHref>
            <motion.button
              className="bg-white text-teal-700 font-semibold px-10 py-4 rounded-full shadow-lg transition-all transform hover:scale-105 hover:bg-teal-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Free Consultation
            </motion.button>
          </Link>
        </div>
      </footer>
    </main>
  );
}
