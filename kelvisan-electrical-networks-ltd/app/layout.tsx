// app/layout.tsx
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import './globals.css';

// --- Consolidated SEO Metadata for the entire application ---
// This metadata will be used by Next.js to populate the <head> section of your HTML.
// It's a best practice for SEO in Next.js App Router.
export const metadata = {
  // Default/Homepage specific metadata
  title: 'KELVISAN ELECTRICAL NETWORKS LTD - Powering Innovation in Kenya',
  description: 'KELVISAN ELECTRICAL NETWORKS LTD offers expert electrical, IT, and software solutions in Kenya. From reliable power installations to cutting-edge digital infrastructure, we are your trusted technology partner.',
  keywords: 'electrical solutions Kenya, IT services Kenya, software development Kenya, networking, power backup, smart home, Kelvisan, Nairobi, Mombasa, Kisumu, technology solutions, renewable energy',
  author: 'Kelvisan Electrical Networks Ltd',
  openGraph: {
    title: 'KELVISAN ELECTRICAL NETWORKS LTD - Your Technology Partner in Kenya',
    description: 'Expert electrical, IT & software solutions for homes, businesses, and industries across Kenya.',
    url: 'https://kelvisan-electrical-networks-ltd.vercel.app/', // Replace with your actual deployed URL
    siteName: 'KELVISAN ELECTRICAL NETWORKS LTD',
    images: [
      {
        url: 'https://kelvisan-electrical-networks-ltd.vercel.app/og-image.jpg', // Replace with a relevant OG image (e.g., your logo or a hero image)
        width: 1200,
        height: 630,
        alt: 'Kelvisan Electrical Networks Ltd Homepage',
      },
    ],
    locale: 'en_KE', // Example for Kenya English
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KELVISAN ELECTRICAL NETWORKS LTD - Powering Innovation in Kenya',
    description: 'Expert electrical, IT & software solutions for homes, businesses, and industries across Kenya.',
    creator: '@KelvisanElect', // Replace with your Twitter handle if you have one
    images: ['https://kelvisan-electrical-networks-ltd.vercel.app/twitter-image.jpg'], // Replace with a relevant Twitter image
  },
  robots: {
    index: true,
    follow: true,
    nocache: false, // Set to false to allow caching
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false, // Allow image indexing
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Add canonical URL for SEO
  alternates: {
    canonical: 'https://kelvisan-electrical-networks-ltd.vercel.app/', // Replace with your actual deployed URL
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-base-100 text-base-content font-sans min-h-screen flex flex-col">
        <Navbar />
        {/* Added padding-top to offset the fixed navbar height */}
        <main className="flex-1 w-full px-0 sm:px-0 md:px-0 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}