'use client';

import {
  CheckCircleIcon,
  EyeIcon,
  LightBulbIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';

export const About = () => {
  return (
    <>
      <Head>
        <title>About Us | KELVISAN ELECTRICAL NETWORKS LTD</title>
        <meta
          name="description"
          content="Kelvinsan Electrical Networks Ltd is a trusted leader in electrical, networking, and software solutions across East Africa."
        />
        <meta
          name="keywords"
          content="Kelvinsan, Electrical Services Kenya, Networking Solutions, Software Development, CCNP, ISO Certified"
        />
        <meta name="author" content="Kelvinsan Electrical Networks Ltd" />
        <meta property="og:title" content="About Us - Kelvinsan Electrical Networks Ltd" />
        <meta
          property="og:description"
          content="Discover Kelvinsan Electrical Networks Ltd—your reliable partner for electrical, networking, and software infrastructure projects."
        />
        <meta property="og:image" content="/company-team.jpg" />
        <meta property="og:type" content="website" />
      </Head>

      <section className="min-h-screen py-16 bg-sky-100 text-gray-800 w-full">
        <div className="w-full px-6 lg:px-24">
          {/* Page Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-12"
          >
            About Us
          </motion.h1>

          {/* Who We Are */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-7xl mx-auto mb-16 leading-relaxed"
          >
            <h2 className="text-3xl md:text-4xl font-bold border-b-2 border-gray-300 pb-2">
              Who We Are
            </h2>
            <p className="text-lg">
              <strong>Kelvinsan Electrical Networks Ltd</strong> is a premier provider of electrical, networking, and software development services in East Africa. With years of experience and a customer-first approach, we deliver results-driven solutions that power homes, businesses, and industries.
            </p>
            <p className="text-lg">
              Our certified team of electrical engineers, software developers, and network professionals ensures projects are executed with innovation, safety, and professionalism from consultation through delivery.
            </p>
          </motion.div>

          {/* Mission, Vision, Core Values */}
          <div className="grid md:grid-cols-3 gap-6 mb-20 max-w-7xl mx-auto">
            {[
              {
                title: 'Our Mission',
                icon: LightBulbIcon,
                text: 'To empower clients through innovative and secure electrical and digital infrastructure that ensures efficiency and sustainable growth.',
              },
              {
                title: 'Our Vision',
                icon: EyeIcon,
                text: 'To be East Africa’s most trusted partner for infrastructure and technology services — setting the standard for quality and innovation.',
              },
              {
                title: 'Our Core Values',
                icon: StarIcon,
                text: (
                  <ul className="space-y-1 text-left pl-4 list-disc">
                    <li>Integrity</li>
                    <li>Innovation</li>
                    <li>Excellence</li>
                    <li>Customer-Centric Approach</li>
                  </ul>
                ),
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="bg-teal-200 border border-gray-200 rounded-lg shadow hover:shadow-lg p-6 text-center transition duration-300"
              >
                <item.icon className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <div className="text-gray-700">{item.text}</div>
              </motion.div>
            ))}
          </div>

          {/* Certifications & Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-20 max-w-7xl mx-auto"
          >
            <h2 className="text-3xl font-bold border-b-2 border-gray-300 pb-2 mb-6">
              Certifications & Achievements
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 text-lg text-gray-800 list-disc list-inside">
              <li>Licensed by Kenya Energy Regulatory Authority</li>
              <li>Certified Cisco Network Professionals (CCNP)</li>
              <li>ISO 9001:2015 Quality Management Compliance</li>
              <li>Over 150 successful project deployments</li>
            </ul>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col-reverse lg:flex-row items-center gap-12 max-w-7xl mx-auto"
          >
            {/* Text Content */}
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold border-b-2 border-gray-300 pb-2">
                Why Choose Us?
              </h2>
              <p className="text-lg leading-relaxed">
                With a passion for precision and a dedication to customer satisfaction, we deliver future-proof solutions built to last.
              </p>
              <ul className="space-y-2 text-gray-900 text-base">
                <li>
                  <CheckCircleIcon className="inline w-5 h-5 mr-2 text-blue-600" />
                  5+ years of proven industry experience
                </li>
                <li>
                  <CheckCircleIcon className="inline w-5 h-5 mr-2 text-blue-600" />
                  Licensed, certified & insured professionals
                </li>
                <li>
                  <CheckCircleIcon className="inline w-5 h-5 mr-2 text-blue-600" />
                  24/7 customer support & response
                </li>
                <li>
                  <CheckCircleIcon className="inline w-5 h-5 mr-2 text-blue-600" />
                  Transparent, client-focused approach
                </li>
              </ul>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/contact">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-300 shadow">
                    Contact Us
                  </button>
                </Link>
                <Link href="/services">
                  <button className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50 transition duration-300 shadow">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 overflow-hidden rounded-lg shadow-lg group">
              <img
                src="/company-team.jpg"
                alt="Our experienced team in action"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
