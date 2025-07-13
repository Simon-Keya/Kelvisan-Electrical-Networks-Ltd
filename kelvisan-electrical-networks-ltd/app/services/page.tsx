// app/services/page.tsx
'use client';

import { Services } from '../../components/Service';
import { motion } from 'framer-motion'; // Import motion for potential page transitions

// --- SEO Metadata (for Next.js App Router) ---
export const metadata = {
  title: 'Our Services | KELVISAN ELECTRICAL NETWORKS LTD',
  description: 'Discover comprehensive electrical, IT, and software services offered by KELVISAN ELECTRICAL NETWORKS LTD. From installations and maintenance to networking and custom software, we provide reliable solutions across Kenya.',
  keywords: 'electrical services, IT services, software development, network installation, power backup, smart home solutions, Kenya, Kelvisan, maintenance, consultancy',
  author: 'Kelvisan Electrical Networks Ltd',
  openGraph: {
    title: 'Services - Kelvisan Electrical Networks Ltd',
    description: 'Explore our full range of expert electrical, IT, and software services designed for efficiency and reliability.',
    url: 'https://kelvisan-electrical-networks-ltd.vercel.app/services', // Replace with your actual deployed URL
    siteName: 'KELVISAN ELECTRICAL NETWORKS LTD',
    images: [
      {
        url: 'https://kelvisan-electrical-networks-ltd.vercel.app/og-image-services.jpg', // Replace with a relevant OG image for services
        width: 1200,
        height: 630,
        alt: 'Kelvisan Services Overview',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services - Kelvisan Electrical Networks Ltd',
    description: 'Explore our full range of expert electrical, IT, and software services designed for efficiency and reliability.',
    creator: '@KelvisanElect', // Your Twitter handle
    images: ['https://kelvisan-electrical-networks-ltd.vercel.app/twitter-image-services.jpg'], // Replace with a relevant Twitter image for services
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://kelvisan-electrical-networks-ltd.vercel.app/services', // Replace with your actual deployed URL
  },
};

// Framer Motion variants for page transition (optional, but good for consistency)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeIn' } },
};

export default function ServicesPage() {
  return (
    <motion.main
      className="min-h-screen bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      role="main" // Semantic role for the main content area
      aria-label="Our Services Page" // Accessibility label
    >
      {/* The Services component already contains Framer Motion animations and Next.js Image */}
      <Services />
    </motion.main>
  );
}