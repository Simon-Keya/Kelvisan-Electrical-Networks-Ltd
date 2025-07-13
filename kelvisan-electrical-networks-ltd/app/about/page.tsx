// app/about/page.tsx
'use client';

import { motion } from 'framer-motion'; // Import motion for potential page transitions
import { About } from '../../components/About';

// --- SEO Metadata (for Next.js App Router) ---
export const metadata = {
  title: 'About Us | KELVISAN ELECTRICAL NETWORKS LTD',
  description: 'Learn more about KELVISAN ELECTRICAL NETWORKS LTD, our mission to innovate in electrical, IT, and software solutions, and our commitment to empowering Kenya\'s digital and energy future. Discover our values, team, and history.',
  keywords: 'about Kelvisan, Kelvisan mission, electrical company Kenya, IT company Kenya, software company Kenya, technology innovation, Kenya tech, company values, team',
  author: 'Kelvisan Electrical Networks Ltd',
  openGraph: {
    title: 'About Us - Kelvisan Electrical Networks Ltd',
    description: 'Discover the story behind KELVISAN ELECTRICAL NETWORKS LTD and our dedication to transformative technology solutions in Kenya.',
    url: 'https://kelvisan-electrical-networks-ltd.vercel.app/about', // Replace with your actual deployed URL
    siteName: 'KELVISAN ELECTRICAL NETWORKS LTD',
    images: [
      {
        url: 'https://kelvisan-electrical-networks-ltd.vercel.app/og-image-about.jpg', // Replace with a relevant OG image for about page
        width: 1200,
        height: 630,
        alt: 'About Kelvisan Electrical Networks Ltd',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Kelvisan Electrical Networks Ltd',
    description: 'Discover the story behind KELVISAN ELECTRICAL NETWORKS LTD and our dedication to transformative technology solutions in Kenya.',
    creator: '@KelvisanElect', // Your Twitter handle
    images: ['https://kelvisan-electrical-networks-ltd.vercel.app/twitter-image-about.jpg'], // Replace with a relevant Twitter image for about page
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
    canonical: 'https://kelvisan-electrical-networks-ltd.vercel.app/about', // Replace with your actual deployed URL
  },
};

// Framer Motion variants for page transition (optional, but good for consistency)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeIn' } },
};

export default function AboutPage() {
  return (
    <motion.main
      className="min-h-screen bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      role="main" // Semantic role for the main content area
      aria-label="About Us Page" // Accessibility label
    >
      {/* The About component should ideally handle its own internal animations if desired. */}
      {/* Ensure the About component itself uses Next.js Image for images within it for optimization. */}
      <About />
    </motion.main>
  );
}