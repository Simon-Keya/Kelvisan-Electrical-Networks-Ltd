// app/networking/page.tsx
'use client';

import { motion } from 'framer-motion'; // Import motion for potential page transitions
import Networking from '../../components/Networking';

// --- SEO Metadata (for Next.js App Router) ---
export const metadata = {
  title: 'Networking Solutions | KELVISAN ELECTRICAL NETWORKS LTD',
  description: 'KELVISAN ELECTRICAL NETWORKS LTD offers robust IT & networking solutions including structured cabling, enterprise WiFi, server & data management, and IT support. Build a fast, secure, and reliable digital infrastructure in Kenya.',
  keywords: 'network installations Kenya, IT support, server solutions, data management, enterprise WiFi, cybersecurity, structured cabling, Kelvisan',
  author: 'Kelvisan Electrical Networks Ltd',
  openGraph: {
    title: 'Networking Solutions - Kelvisan Electrical Networks Ltd',
    description: 'Build a robust and secure digital infrastructure with our expert IT and networking services.',
    url: 'https://kelvisan-electrical-networks-ltd.vercel.app/networking', // Replace with your actual deployed URL
    siteName: 'KELVISAN ELECTRICAL NETWORKS LTD',
    images: [
      {
        url: 'https://kelvisan-electrical-networks-ltd.vercel.app/og-image-networking.jpg', // Replace with a relevant OG image for networking services
        width: 1200,
        height: 630,
        alt: 'Kelvisan Networking Solutions',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Networking Solutions - Kelvisan Electrical Networks Ltd',
    description: 'Build a robust and secure digital infrastructure with our expert IT and networking services.',
    creator: '@KelvisanElect', // Your Twitter handle
    images: ['https://kelvisan-electrical-networks-ltd.vercel.app/twitter-image-networking.jpg'], // Replace with a relevant Twitter image for networking services
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
    canonical: 'https://kelvisan-electrical-networks-ltd.vercel.app/networking', // Replace with your actual deployed URL
  },
};

// Framer Motion variants for page transition (optional, but good for consistency)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeIn' } },
};

export default function NetworkingPage() {
  return (
    <motion.main
      className="min-h-screen bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      role="main" // Semantic role for the main content area
      aria-label="Networking Solutions Page" // Accessibility label
    >
      {/* The Networking component should ideally handle its own internal animations if desired. */}
      {/* Ensure the Networking component itself uses Next.js Image for images within it for optimization. */}
      <Networking />
    </motion.main>
  );
}