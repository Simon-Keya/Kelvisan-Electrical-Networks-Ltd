'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  details?: string[];
  image: string;
  icon: ReactNode;
}

export const ServiceCard = ({ title, description, details, image, icon }: ServiceCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-md bg-white dark:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-gray-200 dark:border-gray-800">
      {/* Image Section */}
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300" />
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
            {icon}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>

        {/* Details Toggle */}
        {details && (
          <div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="mt-2 text-sm font-medium text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 transition"
            >
              {showDetails ? 'Hide details ▲' : 'View details ▼'}
            </button>

            <AnimatePresence initial={false}>
              {showDetails && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300 pl-4 list-disc"
                >
                  {details.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};
