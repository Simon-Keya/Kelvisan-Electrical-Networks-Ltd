'use client';

import {
  BoltIcon,
  ChatBubbleLeftRightIcon,
  GlobeAltIcon,
  LightBulbIcon,
  ServerStackIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { ServiceCard } from './ServiceCard';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const electricalServices = [
  {
    title: 'Electrical Installations',
    description:
      'Expert installations for wiring, lighting, and panels in homes, businesses, and industries. We prioritize safety, compliance, and long-term performance.',
    image: '/services/electrical.jpg',
    icon: <BoltIcon className="w-8 h-8 text-yellow-400" />,
  },
  {
    title: 'Power Backup Systems',
    description:
      'Inverter, UPS, and solar power systems tailored to ensure constant power during outages, keeping operations smooth and uninterrupted.',
    image: '/services/power-backup.jpg',
    icon: <ShieldCheckIcon className="w-8 h-8 text-green-400" />,
  },
  {
    title: 'Electrical Maintenance',
    description:
      'Preventive inspections, repairs, and upgrades to keep your electrical systems safe, efficient, and compliant with current regulations.',
    image: '/services/maintenance.jpg',
    icon: <WrenchScrewdriverIcon className="w-8 h-8 text-orange-400" />,
  },
];

const networkingServices = [
  {
    title: 'Network Installations',
    description:
      'Structured cabling, enterprise WiFi, and firewalled networks for reliable, fast, and secure digital infrastructure.',
    image: '/services/networking.jpg',
    icon: <GlobeAltIcon className="w-8 h-8 text-blue-400" />,
  },
  {
    title: 'Server & Data Solutions',
    description:
      'Set up and manage cloud/on-premise servers, scalable databases, and storage for optimized data management.',
    image: '/services/server.jpg',
    icon: <ServerStackIcon className="w-8 h-8 text-purple-400" />,
  },
  {
    title: 'IT Support & Consultancy',
    description:
      'Dedicated support, threat audits, and IT strategy consultancy to secure and evolve your tech infrastructure.',
    image: '/services/it-support.jpg',
    icon: <ChatBubbleLeftRightIcon className="w-8 h-8 text-cyan-400" />,
  },
];

const softwareServices = [
  {
    title: 'Custom Software Development',
    description:
      'Tailor-made applications and automation solutions to streamline operations, improve UX, and drive growth.',
    image: '/services/software.jpg',
    icon: <SparklesIcon className="w-8 h-8 text-pink-400" />,
  },
  {
    title: 'Smart Home & IoT Solutions',
    description:
      'Intelligent automation and IoT devices to boost efficiency, comfort, and security in modern spaces.',
    image: '/services/smart-home.jpg',
    icon: <LightBulbIcon className="w-8 h-8 text-lime-400" />,
  },
];

export function Services() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
      id="services"
      aria-labelledby="services-heading"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/service.jpg"
          alt="Kelvinsan service background showing infrastructure and technology"
          className="w-full h-full object-cover object-center brightness-75"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <motion.h2
          id="services-heading"
          className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight"
          variants={fadeInUp}
          custom={0}
        >
          Expert Electrical, IT & Software Services
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-lg md:text-xl text-gray-200 mb-14"
          variants={fadeInUp}
          custom={1}
        >
          At KELVSAN ELECTRICAL NETWORKS LTD, we deliver reliable, scalable, and forward-thinking solutions for homes, businesses, and industries. From installations to innovation—we certainly got you covered.
        </motion.p>

        {/* Electrical Services */}
        <motion.div variants={fadeInUp} custom={2}>
          <h3 className="text-2xl font-semibold mb-6 text-blue-200 underline underline-offset-4">
            Electrical Solutions
          </h3>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {electricalServices.map((service, i) => (
            <motion.div key={service.title} variants={fadeInUp} custom={i + 3}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        {/* Networking Services */}
        <motion.div variants={fadeInUp} custom={6}>
          <h3 className="text-2xl font-semibold mb-6 text-blue-200 underline underline-offset-4">
            IT & Networking Solutions
          </h3>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {networkingServices.map((service, i) => (
            <motion.div key={service.title} variants={fadeInUp} custom={i + 7}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        {/* Software Services */}
        <motion.div variants={fadeInUp} custom={10}>
          <h3 className="text-2xl font-semibold mb-6 text-blue-200 underline underline-offset-4">
            Software & Innovation
          </h3>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          {softwareServices.map((service, i) => (
            <motion.div key={service.title} variants={fadeInUp} custom={i + 11}>
              <ServiceCard {...service} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          custom={13}
          className="mt-20 border-t border-white/30 w-2/3 mx-auto opacity-50"
        />
        <motion.p
          className="mt-10 text-lg text-gray-300 max-w-2xl mx-auto"
          variants={fadeInUp}
          custom={14}
        >
          Ready to power up your next project? Let us discuss how we can support your electrical, IT, or digital transformation goals.
        </motion.p>
        <motion.a
          href="/contact"
          variants={fadeInUp}
          custom={15}
          aria-label="Contact Kelvinsan for services"
        >
          <button className="mt-6 bg-teal-400 hover:bg-teal-500 text-black font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300">
            Contact Us Today
          </button>
        </motion.a>
      </div>
    </motion.section>
  );
}
