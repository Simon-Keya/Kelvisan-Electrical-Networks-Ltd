'use client';

import { motion } from 'framer-motion';

const newsItems = [
  {
    title: 'Kelvisan Launches Smart Grid Monitoring Tool',
    date: 'May 10, 2025',
    description: 'Kelvisan debuts a new tool to enhance visibility and analytics for power grids in remote areas.',
  },
  {
    title: 'Partnership with County Governments on Electrification',
    date: 'April 20, 2025',
    description: 'Kelvisan partners with local governments to expand power access through decentralized networks.',
  },
  {
    title: 'Kelvisan Software Wins Innovation Award',
    date: 'March 12, 2025',
    description: 'Kelvisan was recognized for its smart load-balancing software at the African Tech Awards.',
  },
];

const News = () => {
  return (
    <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-10"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Latest News & Announcements
        </motion.h2>

        <div className="space-y-8">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              className="p-6 bg-teal-100 dark:bg-gray-800 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.date}</p>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
