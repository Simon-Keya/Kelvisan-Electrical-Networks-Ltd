// app/electrical/page.tsx
'use client';

import { motion } from 'framer-motion'; // Import motion for potential page transitions
import Electrical from '../../components/Electrical';

// --- SEO Metadata (for Next.js App Router) ---
export const metadata = {
  title: 'Electrical Solutions | KELVISAN ELECTRICAL NETWORKS LTD',
  description: 'KELVISAN ELECTRICAL NETWORKS LTD provides comprehensive electrical solutions including installations, power backup systems, and maintenance. Ensuring safe, efficient, and reliable power for homes, businesses, and industries in Kenya.',
  keywords: 'electrical installations Kenya, power backup systems, solar power Kenya, electrical maintenance, smart grids, renewable energy, electrical wiring, Kelvisan',
  author: 'Kelvisan Electrical Networks Ltd',
  openGraph: {
    title: 'Electrical Solutions - Kelvisan Electrical Networks Ltd',
    description: 'Specializing in electrical installations, power backup, and maintenance for a reliable energy future.',
    url: 'https://kelvisan-electrical-networks-ltd.vercel.app/electrical', // Replace with your actual deployed URL
    siteName: 'KELVISAN ELECTRICAL NETWORKS LTD',
    images: [
      {
        url: 'https://kelvisan-electrical-networks-ltd.vercel.app/og-image-electrical.jpg', // Replace with a relevant OG image for electrical services
        width: 1200,
        height: 630,
        alt: 'Kelvisan Electrical Solutions',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Electrical Solutions - Kelvisan Electrical Networks Ltd',
    description: 'Specializing in electrical installations, power backup, and maintenance for a reliable energy future.',
    creator: '@KelvisanElect', // Your Twitter handle
    images: ['https://kelvisan-electrical-networks-ltd.vercel.app/twitter-image-electrical.jpg'], // Replace with a relevant Twitter image for electrical services
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
    canonical: 'https://kelvisan-electrical-networks-ltd.vercel.app/electrical', // Replace with your actual deployed URL
  },
};

// Framer Motion variants for page transition (optional, but good for consistency)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeIn' } },
};

export default function ElectricalPage() {
  return (
    <motion.main
      className="min-h-screen bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      role="main" // Semantic role for the main content area
      aria-label="Electrical Solutions Page" // Accessibility label
    >
      {/* The Electrical component should ideally handle its own internal animations if desired. */}
      {/* Ensure the Electrical component itself uses Next.js Image for images within it for optimization. */}
      <Electrical />
    </motion.main>
  );
}