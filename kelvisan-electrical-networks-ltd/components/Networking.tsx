'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Networking() {
  return (
    <main className="pt-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="px-6 py-16 bg-yellow-500 text-teal-900 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-bold mb-4"
        >
          Networking Solutions at Kelvisan
        </motion.h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl">
          We design, install, secure, and maintain efficient networking systems for businesses, schools, and public institutions across Kenya.
        </p>
      </section>

      {/* Why Networking Matters */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-teal-700 dark:text-yellow-400">Why Reliable Networking Is Essential</h2>
        <ul className="space-y-4 list-disc pl-6">
          <li><strong>Business Continuity:</strong> Avoid downtimes with stable LAN/WAN infrastructure.</li>
          <li><strong>Cybersecurity:</strong> Protect your data through structured and secured networks.</li>
          <li><strong>Remote Access:</strong> Empower your teams with VPN and cloud-based solutions.</li>
          <li><strong>Scalability:</strong> We future-proof your network for growing needs.</li>
        </ul>
      </section>

      {/* Services Offered */}
      <section className="bg-gray-100 dark:bg-gray-800 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-teal-700 dark:text-yellow-400">Our Networking Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Structured Cabling", desc: "Installation of Ethernet, fiber optics, patch panels, and cable trays." },
              { title: "Wireless Networking", desc: "Enterprise Wi-Fi planning, installation, and optimization." },
              { title: "Firewall & Security", desc: "Deployment of firewalls, VLANs, and access control policies." },
              { title: "Network Monitoring", desc: "Proactive monitoring and performance analytics to minimize downtimes." },
              { title: "VPN Setup", desc: "Secure VPN access for remote teams and hybrid work models." },
              { title: "Server Room Setup", desc: "Rack installation, cooling design, power management, and security." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-teal-700 dark:text-yellow-300">{item.title}</h3>
                <p className="mt-2 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-teal-700 dark:text-yellow-400">What Our Clients Say</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded shadow">
            <p className="text-lg">&rsquo;Kelvisan transformed our outdated infrastructure into a seamless hybrid-ready system. Zero downtime since&rsquo;</p>
            <p className="mt-4 font-semibold text-teal-700 dark:text-yellow-300">— ICT Director, Nairobi Academy</p>
          </div>
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded shadow">
            <p className="text-lg">&rsquo;Their network security configuration saved us from multiple intrusion attempts. Highly recommended!&quot;</p>
            <p className="mt-4 font-semibold text-teal-700 dark:text-yellow-300">— CIO, Coastal Bank Kenya</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 text-center bg-yellow-400 text-teal-900">
        <h2 className="text-3xl font-bold mb-4">Ready to Upgrade Your Network?</h2>
        <p className="max-w-xl mx-auto mb-6">Reach out for a free site survey and expert consultation. We&rsquo;ll design a custom networking solution for your needs.</p>
        <Link href="/contact">
          <button className="bg-teal-800 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition">
            Book a Free Consultation
          </button>
        </Link>
      </section>
    </main>
  );
}
