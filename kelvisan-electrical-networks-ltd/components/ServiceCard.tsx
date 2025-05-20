'use client';

import { ReactNode } from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  image: string;
  icon: ReactNode;
}

export const ServiceCard = ({ title, description, image, icon }: ServiceCardProps) => {
  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg bg-white text-gray-800 hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-2">
      
      {/* ✅ Native Image Element */}
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition duration-300"></div>
      </div>

      {/* ✅ Content */}
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};
