'use client';

import { motion } from 'framer-motion';

const newsItems = [
  {
    title: 'Kelvisan Launches Smart Grid Monitoring Tool',
    date: 'May 10, 2025',
    description: 'Kelvisan unveils a real-time smart grid analytics platform for rural electrification and data-driven load management across Kenya.',
  },
  {
    title: 'Partnership with County Governments on Electrification',
    date: 'April 20, 2025',
    description: 'Kelvisan partners with five county governments to implement hybrid solar-grid networks for underserved communities.',
  },
  {
    title: 'Kelvisan Software Wins Innovation Award',
    date: 'March 12, 2025',
    description: 'Kelvisan’s AI-driven load balancing software won first place at the African Tech Awards for its impact on energy efficiency.',
  },
  {
    title: 'New Data Center Opened in Nakuru',
    date: 'February 5, 2025',
    description: 'Kelvisan commissions a state-of-the-art Tier III data center in Nakuru, enhancing cloud and infrastructure services across the Rift Valley.',
  },
  {
    title: 'Kelvisan Trains 500+ Youth in Networking & Energy Systems',
    date: 'January 20, 2025',
    description: 'Through its Skills Forward Program, Kelvisan has equipped youth with industry certifications in fiber optics, electrical safety, and network administration.',
  },
  {
    title: 'Kelvisan Releases Network Optimization Toolkit',
    date: 'December 10, 2024',
    description: 'The toolkit allows ISPs and enterprises to enhance network performance, minimize downtime, and automate diagnostics.',
  },
];

const News = () => {
  return (
    <section className="min-h-screen py-24 px-6 lg:px-24 bg-gradient-to-b from-white via-teal-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-teal-700 dark:text-teal-300"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest News & Announcements
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-teal-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-teal-700 dark:text-teal-400 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 italic">
                {item.date}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default News;
