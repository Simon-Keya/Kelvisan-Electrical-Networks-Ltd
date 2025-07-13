// app/contact/page.tsx
'use client';

import { motion } from 'framer-motion'; // Import motion for potential page transitions
import Contact from '../../components/Contact';

// --- SEO Metadata (for Next.js App Router) ---
export const metadata = {
  title: 'Contact Us | KELVISAN ELECTRICAL NETWORKS LTD',
  description: 'Get in touch with KELVISAN ELECTRICAL NETWORKS LTD for inquiries, support, or partnership opportunities. Reach out to our team for expert electrical, IT, and software solutions in Kenya.',
  keywords: 'contact Kelvisan, Kelvisan support, electrical services contact, IT services contact, software development contact, Kenya tech support, business inquiry, partnership',
  author: 'Kelvisan Electrical Networks Ltd',
  openGraph: {
    title: 'Contact Us - Kelvisan Electrical Networks Ltd',
    description: 'Connect with KELVISAN ELECTRICAL NETWORKS LTD for all your electrical, IT, and software needs.',
    url: 'https://kelvisan-electrical-networks-ltd.vercel.app/contact', // Replace with your actual deployed URL
    siteName: 'KELVISAN ELECTRICAL NETWORKS LTD',
    images: [
      {
        url: 'https://kelvisan-electrical-networks-ltd.vercel.app/og-image-contact.jpg', // Replace with a relevant OG image for contact page
        width: 1200,
        height: 630,
        alt: 'Contact Kelvisan Electrical Networks Ltd',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Kelvisan Electrical Networks Ltd',
    description: 'Connect with KELVISAN ELECTRICAL NETWORKS LTD for all your electrical, IT, and software needs.',
    creator: '@KelvisanElect', // Your Twitter handle
    images: ['https://kelvisan-electrical-networks-ltd.vercel.app/twitter-image-contact.jpg'], // Replace with a relevant Twitter image for contact page
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
    canonical: 'https://kelvisan-electrical-networks-ltd.vercel.app/contact', // Replace with your actual deployed URL
  },
};

// Framer Motion variants for page transition (optional, but good for consistency)
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: 'easeIn' } },
};

export default function ContactPage() {
  return (
    <motion.main
      className="min-h-screen bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      role="main" // Semantic role for the main content area
      aria-label="Contact Us Page" // Accessibility label
    >
      {/* The Contact component should ideally handle its own internal animations if desired. */}
      {/* Ensure the Contact component itself uses Next.js Image for images within it for optimization. */}
      <Contact />
    </motion.main>
  );
}