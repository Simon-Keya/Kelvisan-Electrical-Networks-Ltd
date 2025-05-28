'use client';

import { motion } from 'framer-motion';

const newsItems = [
  {
    title: 'Kelvisan Partners with TVETs to Train Youth in Electrical Wiring',
    date: 'May 15, 2025',
    description:
      'Kelvisan collaborates with Technical Vocational Training Institutions in Kisumu and Eldoret to train 300+ youth in certified electrical wiring courses.',
  },
  {
    title: 'Pilot Rollout of Solar-Backed Microgrids in Kajiado',
    date: 'April 20, 2025',
    description:
      'Kelvisan has successfully installed and activated its first solar-powered microgrids in two off-grid villages, offering affordable energy access to over 1,200 homes.',
  },
  {
    title: 'Kelvisan Conducts Cyber Hygiene Workshop for SMEs',
    date: 'March 8, 2025',
    description:
      'A cybersecurity awareness session for small business owners was held in Nairobi, helping local entrepreneurs protect their networks from growing cyber threats.',
  },
  {
    title: 'Kelvisan Installs Fiber Internet in 10 Public Schools',
    date: 'February 21, 2025',
    description:
      'In collaboration with local ISPs, Kelvisan has connected 10 rural schools in Bungoma County to high-speed fiber internet to improve digital learning.',
  },
  {
    title: 'ICT Authority Recognizes Kelvisan for Innovation in Rural Networking',
    date: 'January 30, 2025',
    description:
      'Kelvisan received a special mention by the ICT Authority for its role in driving innovation in last-mile connectivity solutions for marginalized regions.',
  },
  {
    title: 'Kelvisan Hosts Women in Tech Networking Event in Nairobi',
    date: 'December 12, 2024',
    description:
      'The event brought together 150+ women from the tech and energy sectors to foster mentorship, investment, and leadership among young professionals.',
  },
];

const News = () => {
  return (
    <section className="min-h-screen py-24 px-6 lg:px-20 bg-gradient-to-b from-white via-teal-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-teal-700 dark:text-teal-300"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Latest News & Announcements
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl border border-teal-100 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold text-teal-700 dark:text-teal-400 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 italic mb-3">
                  {item.date}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 flex-grow">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default News;
