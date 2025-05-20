'use client';

import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { ContactForm } from './ContactForm';

export default function Contact() {
  return (
    <main className="w-full bg-blue-100 text-gray-800">
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        {/* Hero Section */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Contact Us
          </h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            We’re just a message away. Whether it’s a partnership opportunity, a technical consultation, or a service request — reach out today!
          </p>
        </motion.header>

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.aside
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Welcome Message */}
            <div className="bg-primary/10 text-primary p-5 rounded-lg border-l-4 border-primary shadow-sm">
              <h3 className="text-xl font-bold mb-2">Let’s Collaborate</h3>
              <p className="text-sm text-gray-700">
                Our expert team is always eager to hear from you. We provide fast responses, dedicated support, and custom-tailored solutions for your electrical and networking needs.
              </p>
            </div>

            {/* Why Choose Us */}
            <div className="bg-secondary/10 text-secondary p-5 rounded-lg shadow-sm border-l-4 border-secondary">
              <h3 className="text-lg font-semibold mb-1">Why Clients Trust Us</h3>
              <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                <li>Proven excellence in service delivery</li>
                <li>Quick turnaround and reliable support</li>
                <li>Customized electrical/networking solutions</li>
                <li>Certified and experienced technicians</li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="bg-blue-200 shadow-lg p-6 rounded-xl border border-gray-200">
              <h2 className="text-2xl font-semibold text-primary mb-4">
                Contact Information
              </h2>

              <div className="space-y-5 text-gray-800">
                <div className="flex items-start gap-4">
                  <MapPinIcon className="w-6 h-6 text-secondary" />
                  <div>
                    <h4 className="font-semibold">Office Address</h4>
                    <p>1234 Innovation Street, Nairobi, Kenya</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <PhoneIcon className="w-6 h-6 text-secondary" />
                  <div>
                    <h4 className="font-semibold">Phone Number</h4>
                    <p>+254711762682</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <EnvelopeIcon className="w-6 h-6 text-secondary" />
                  <div>
                    <h4 className="font-semibold">Email Address</h4>
                    <p>info@kelvinsan.co.ke</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Note */}
            <div className="bg-blue-200 border border-gray-200 p-4 rounded-lg text-sm text-gray-700 shadow-sm">
              <p>
                ⏰ <strong>Business Hours:</strong><br />
                Monday – Friday: 9:00 AM – 6:00 PM<br />
                Saturday: 10:00 AM – 2:00 PM<br />
                Sunday & Public Holidays: Closed
              </p>
            </div>
          </motion.aside>

          {/* Contact Form (No border or title now) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-200 shadow-xl p-8 rounded-xl"
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* Embedded Google Map */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-xl overflow-hidden shadow-lg"
        >
          <iframe
            title="Kelvinsan Electrical Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1994.6357319562906!2d36.821946956712226!3d-1.2920654999796607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10e4c4668b3b%3A0xb07f50f728ad68a1!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1631264222554!5m2!1sen!2ske"
            width="100%"
            height="400"
            loading="lazy"
            allowFullScreen
            className="w-full border-0"
          ></iframe>
        </motion.section>
      </section>
    </main>
  );
}
