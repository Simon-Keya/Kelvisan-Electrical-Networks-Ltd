// components/Service.tsx
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
import Image from 'next/image'; // Import Next.js Image component
import { ServiceCard } from './ServiceCard';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' },
  }),
};

const sectionData = [
  {
    title: 'Electrical Solutions',
    customOffset: 2,
    services: [
      {
        title: 'Electrical Installations',
        description:
          'Expert installations for wiring, lighting, and panels in homes, businesses, and industries. We prioritize safety, compliance, and long-term performance.',
        details: [
          'Custom wiring plans for buildings',
          'Circuit breaker & panel installations',
          'Grounding and surge protection',
          'Inspection and certification compliance',
        ],
        image: '/services/electrical.jpg',
        icon: <BoltIcon className="w-8 h-8 text-yellow-400" />,
      },
      {
        title: 'Power Backup Systems',
        description:
          'Inverter, UPS, and solar power systems tailored to ensure constant power during outages, keeping operations smooth and uninterrupted.',
        details: [
          'Inverter and UPS installation',
          'Solar panel system integration',
          'Battery bank management',
          'Energy audit & load analysis',
        ],
        image: '/services/power-backup.jpg',
        icon: <ShieldCheckIcon className="w-8 h-8 text-green-400" />,
      },
      {
        title: 'Electrical Maintenance',
        description:
          'Preventive inspections, repairs, and upgrades to keep your electrical systems safe, efficient, and compliant with current regulations.',
        details: [
          'Routine safety inspections',
          'Upgrades & rewiring services',
          'Fault tracing & repair',
          'Code compliance checks',
        ],
        image: '/services/maintenance.jpg',
        icon: <WrenchScrewdriverIcon className="w-8 h-8 text-orange-400" />,
      },
    ],
  },
  {
    title: 'IT & Networking Solutions',
    customOffset: 6,
    services: [
      {
        title: 'Network Installations',
        description:
          'Structured cabling, enterprise WiFi, and firewalled networks for reliable, fast, and secure digital infrastructure.',
        details: [
          'Ethernet & fiber optic cabling',
          'Enterprise-grade WiFi setup',
          'Firewall & VLAN configuration',
          'Cable management & labeling',
        ],
        image: '/services/networking.jpg',
        icon: <GlobeAltIcon className="w-8 h-8 text-blue-400" />,
      },
      {
        title: 'Server & Data Solutions',
        description:
          'Set up and manage cloud/on-premise servers, scalable databases, and storage for optimized data management.',
        details: [
          'Server deployment & virtualization',
          'Database setup & optimization',
          'Data backup & redundancy plans',
          'Cloud hosting & migration',
        ],
        image: '/services/server.jpg',
        icon: <ServerStackIcon className="w-8 h-8 text-purple-400" />,
      },
      {
        title: 'IT Support & Consultancy',
        description:
          'Dedicated support, threat audits, and IT strategy consultancy to secure and evolve your tech infrastructure.',
        details: [
          '24/7 tech support contracts',
          'Cybersecurity audits',
          'Infrastructure strategy planning',
          'System updates & patching',
        ],
        image: '/services/It.jpg',
        icon: <ChatBubbleLeftRightIcon className="w-8 h-8 text-cyan-400" />,
      },
    ],
  },
  {
    title: 'Software & Innovation',
    customOffset: 10,
    services: [
      {
        title: 'Custom Software Development',
        description:
          'Tailor-made applications and automation solutions to streamline operations, improve UX, and drive growth.',
        details: [
          'Web & mobile app development',
          'Business process automation',
          'UI/UX design & prototyping',
          'API development & integration',
        ],
        image: '/services/software.jpg',
        icon: <SparklesIcon className="w-8 h-8 text-pink-400" />,
      },
      {
        title: 'Smart Home & IoT Solutions',
        description:
          'Intelligent automation and IoT devices to boost efficiency, comfort, and security in modern spaces.',
        details: [
          'Smart lighting & appliances',
          'IoT device installation',
          'Remote control systems',
          'Security & automation setups',
        ],
        image: '/services/smart-home.jpg',
        icon: <LightBulbIcon className="w-8 h-8 text-lime-400" />,
      },
    ],
  },
];

export function Services() {
  // Placeholder blurDataURL. Replace this with a real base64-encoded blurred image.
  // You can generate this from your /public/service.jpg (e.g., a tiny 8x8px blurred version)
  const blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYGD4DwAAAwH+B+H/AAAAAElFTkSuQmCC'; // A tiny, transparent placeholder

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
        <Image
          src="/service.jpg"
          alt="Kelvinsan service background showing infrastructure and technology"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority // Load this image with high priority as it's a background
          placeholder="blur" // Enable blur placeholder
          blurDataURL={blurDataURL} // Provide the blur data URL
          className="brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Section Heading */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center text-white">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight"
          variants={fadeInUp}
          custom={0}
        >
          Expert Electrical, IT & Software Services
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-gray-300 text-lg sm:text-xl mb-16"
          variants={fadeInUp}
          custom={1}
        >
          From reliable power installations to cutting-edge digital solutions, Kelvisan is your trusted technology partner.
        </motion.p>

        {/* Services */}
        {sectionData.map((section) => (
          <div key={section.title} className="mb-24">
            <motion.h3
              className="text-2xl sm:text-3xl font-semibold mb-10 text-blue-200 underline underline-offset-4"
              variants={fadeInUp}
              custom={section.customOffset}
            >
              {section.title}
            </motion.h3>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {section.services.map((service, i) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  custom={section.customOffset + i + 1}
                >
                  <ServiceCard {...service} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}

        {/* Call to Action */}
        <motion.hr
          className="border-t border-white/20 w-3/4 mx-auto mt-12 mb-10"
          variants={fadeInUp}
          custom={13}
        />
        <motion.p
          className="text-gray-300 max-w-2xl mx-auto text-lg"
          variants={fadeInUp}
          custom={14}
        >
          Let’s collaborate on powering your ideas. Reach out to Kelvinsan for personalized consultation.
        </motion.p>
        <motion.a href="/contact" variants={fadeInUp} custom={15}>
          <button className="mt-6 px-8 py-3 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-black font-semibold rounded-full shadow-xl transition duration-300">
            Contact Us Today
          </button>
        </motion.a>
      </div>
    </motion.section>
  );
}