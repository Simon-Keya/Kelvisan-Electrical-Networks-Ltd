// app/electrical/page.tsx
'use client';

import { motion } from 'framer-motion'; // Import motion for potential page transitions
import Electrical from '../../components/Electrical';

// Removed: --- SEO Metadata (for Next.js App Router) ---
// Removed: export const metadata = { ... };

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