'use client';

import { motion } from 'framer-motion';

// Define a type for the news item data
interface NewsItem {
  title: string;
  date: string;
  description: string;
}

// Data for news and announcements
const newsItems: NewsItem[] = [
  {
    title: 'Kelvisan Pioneers Solar-Backed Microgrids in Kajiado',
    date: 'May 15, 2025',
    description:
      'We have successfully installed our first solar-powered microgrids in two off-grid villages, providing reliable and affordable energy to over 1,200 homes and local businesses.',
  },
  {
    title: 'Strategic Partnership with TVETs to Upskill Kenyan Youth',
    date: 'April 20, 2025',
    description:
      'Kelvisan has launched a new collaboration with Technical Vocational Training Institutions in Kisumu and Eldoret to provide certified electrical wiring courses for 300+ young Kenyans.',
  },
  {
    title: 'Driving Digital Learning: Fiber Internet Deployed in 10 Rural Schools',
    date: 'March 8, 2025',
    description:
      'In a commitment to bridging the digital divide, we have partnered with local ISPs to connect 10 schools in Bungoma County to high-speed fiber internet, enhancing digital learning capabilities.',
  },
  {
    title: 'Kelvisan Hosts Inaugural Women in Tech Event in Nairobi',
    date: 'February 21, 2025',
    description:
      'Our first women in tech networking event brought together 150+ professionals from the energy and tech sectors, fostering a community of mentorship and leadership.',
  },
  {
    title: 'ICT Authority Commends Kelvisan for Rural Connectivity Innovations',
    date: 'January 30, 2025',
    description:
      'Kelvisan received a special recognition from the ICT Authority for our role in developing innovative last-mile connectivity solutions for marginalized regions, earning us a special mention for our work.',
  },
  {
    title: 'Free Cybersecurity Workshop for SMEs Held in Nairobi',
    date: 'December 12, 2024',
    description:
      'We organized a workshop to help small business owners better understand and protect their networks from common cyber threats, reinforcing our commitment to community education and security.',
  },
];

// Reusable component for a news card
const NewsCard = ({ item, index }: { item: NewsItem; index: number }) => (
  <motion.div
    className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index, duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="flex flex-col h-full">
      <p className="text-sm text-gray-500 italic mb-2">{item.date}</p>
      <h3 className="text-lg font-semibold text-teal-700 mb-2 leading-tight flex-grow">
        {item.title}
      </h3>
      <p className="text-sm text-gray-600 flex-grow">{item.description}</p>
    </div>
  </motion.div>
);

const News = () => {
  // The first item is the featured story
  const featuredItem = newsItems[0];
  const otherNewsItems = newsItems.slice(1);

  return (
    <section className="min-h-screen py-24 px-6 lg:px-20 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-teal-800">
            Our Journey So Far
          </h2>
          <p className="text-center text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-16">
            Explore the latest news, announcements, and milestones that are shaping our story.
          </p>
        </motion.div>

        {/* Featured News Article */}
        <motion.div
          className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-yellow-400 mb-12 transform transition-all duration-500 hover:shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-yellow-600 font-semibold mb-2 uppercase tracking-wide">Featured Article</p>
          <h3 className="text-2xl md:text-3xl font-bold text-teal-800 mb-2">
            {featuredItem.title}
          </h3>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            {featuredItem.description}
          </p>
          <p className="mt-4 text-xs text-gray-500 italic">{featuredItem.date}</p>
        </motion.div>

        {/* Other News Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {otherNewsItems.map((item, index) => (
            <NewsCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
