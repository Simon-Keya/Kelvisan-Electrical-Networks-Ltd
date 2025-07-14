// app/page.tsx
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  FaBolt,
  FaNetworkWired,
  FaNewspaper,
  FaUsers,
} from 'react-icons/fa';
import { Hero } from '../components/Hero';
import ProductCard from '../components/ProductCard'; // Import the shared ProductCard
import ProductDetailsModal from '../components/ProductDetailModal'; // Import the ProductDetailsModal
import Subscribe from '../components/Subscribe';
import { Product } from './interfaces/Product';
import { apiRequest } from './lib/api';

// Animation Variants for sections (containerVariant)
const containerVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.75,
      staggerChildren: 0.2,
    },
  },
};

// Re-define cardVariant for StatCard and HighlightCard components ONLY in this file
// The ProductCard component has its own internal itemVariants now.
const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 12,
    },
  },
};

// New Component: FeaturedProducts
const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the modal within FeaturedProducts
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiRequest<Product[]>('/products', { isAuthenticatedRequest: false });
        const parsedProducts = data.map(product => ({
          ...product,
          price: parseFloat(product.price.toString()),
        }));
        setProducts(parsedProducts.slice(0, 4)); // Display only the first 4 products
      } catch (err: unknown) {
        console.error('Error fetching featured products:', err);
        setError(err instanceof Error ? err.message : 'Failed to load featured products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handlers for the modal
  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleCloseModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null); // Clear selected product when closing
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading featured products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <motion.section
      className="py-16 px-4 lg:px-24 bg-gradient-to-b from-white via-gray-50 to-teal-50 border-t border-gray-100"
      variants={containerVariant}
      initial="hidden"
      whileInView="visible" // Trigger animation when in view
      viewport={{ once: true, amount: 0.3 }}
      aria-labelledby="featured-products-heading" // Accessibility
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2 id="featured-products-heading" className="text-3xl sm:text-4xl font-bold text-teal-700 text-center mb-6">
          Our Featured Products
        </motion.h2>
        <motion.p className="text-gray-700 text-center mb-12 max-w-2xl mx-auto text-lg">
          Discover some of our top-selling electrical, networking, and software products.
        </motion.p>

        {products.length === 0 ? (
          <p className="text-center text-gray-600 text-lg py-10">
            No featured products available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={handleViewDetails} // Pass the handler to open the modal
                isModalOpenForThisProduct={selectedProduct?.id === product.id && showProductModal} // Pass modal state
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/products" passHref>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full shadow-lg transition duration-300"
              aria-label="View all products" // Accessibility
            >
              View All Products
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Product Details Modal for Featured Products */}
      <ProductDetailsModal
        show={showProductModal}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </motion.section>
  );
};


export default function Homepage() {
  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-teal-50 text-gray-900 scroll-smooth" role="main">

      {/* Hero Section */}
      <motion.div variants={containerVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <Hero />
      </motion.div>

      {/* Stats Section */}
      <section className="py-16 px-4 lg:px-24 bg-gradient-to-b from-gray-100 via-white to-sky-100" aria-labelledby="stats-heading">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }} // Adjust viewport amount for better trigger
        >
          <h2 id="stats-heading" className="sr-only">Company Statistics</h2> {/* Hidden heading for accessibility */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-16" role="list">
            <StatCard value="50+" label="ISP Customers" />
            <StatCard value="4+" label="ISP Centres" />
            <StatCard value="24/7" label="Network Service" />
            <StatCard value="99.9%" label="Uptime Guarantee" />
          </div>
        </motion.div>
      </section>

      {/* Focus Areas Section */}
      <section className="py-16 px-4 lg:px-24 bg-gradient-to-b from-white via-blue-100 to-white border-t border-gray-100" aria-labelledby="focus-areas-heading">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 id="focus-areas-heading" className="text-3xl sm:text-4xl font-extrabold text-teal-700 text-center mb-4">Core Focus Areas</motion.h2>
          <motion.p className="text-gray-800 text-center mb-12 max-w-2xl mx-auto text-lg">
            We focus on transforming Kenya’s digital and energy landscapes through seamless service delivery.
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" role="list">
            <HighlightCard icon={<FaNetworkWired className="text-4xl text-teal-600" />} title="Networking" description="Broadband access and infrastructure." link="/networking" />
            <HighlightCard icon={<FaBolt className="text-4xl text-yellow-500" />} title="Electrical Solutions" description="Smart grids and renewable energy." link="/electrical" />
            <HighlightCard icon={<FaUsers className="text-4xl text-blue-600" />} title="Membership" description="Collaborate with our vibrant community." link="/membership" />
            <HighlightCard icon={<FaNewspaper className="text-4xl text-red-500" />} title="News" description="Latest innovations and updates." link="/news" />
          </div>
        </motion.div>
      </section>

      {/* NEW: Featured Products Section (now includes modal logic) */}
      <FeaturedProducts />

      {/* Newsletter Subscription Section */}
      <section className="py-16 px-4 lg:px-24 bg-gradient-to-br from-blue-50 via-white to-teal-50 border-t border-gray-100" aria-labelledby="newsletter-heading">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2 id="newsletter-heading" className="text-3xl sm:text-4xl font-extrabold text-teal-800 mb-4">
            Join Our Community
          </motion.h2>
          <motion.p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Subscribe to our newsletter for exclusive updates, insights, and special offers directly in your inbox.
          </motion.p>
          <div className="max-w-md mx-auto">
            <Subscribe />
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <motion.section
        className="relative py-20 px-4 lg:px-32 text-center bg-gradient-to-br from-yellow-100 via-white to-yellow-200 border-t border-gray-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariant}
        aria-labelledby="call-to-action-heading"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400 to-white" />
        <div className="relative z-10">
          <motion.h3 id="call-to-action-heading" className="text-3xl sm:text-4xl font-extrabold text-teal-800 mb-6">Partner with Kelvisan</motion.h3>
          <motion.p className="text-gray-700 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Join us as we transform smart cities, secure networks, and enable innovation in Kenya.
          </motion.p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <Link href="/contact" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium shadow-md transition duration-300"
                aria-label="Contact us to partner with Kelvisan"
              >
                Contact Us
              </motion.button>
            </Link>
            <Link href="/about" passHref>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-yellow-300 text-blue-900 hover:bg-yellow-400 rounded-lg font-medium shadow-md transition duration-300"
                aria-label="Learn more about joining Kelvisan"
              >
                Join Kelvisan
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

// Stat Card Component
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      variants={cardVariant}
      className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl border border-blue-100 text-center transition-transform duration-300 hover:-translate-y-1"
      whileHover={{ scale: 1.05 }}
      role="listitem"
      aria-label={`${value} ${label}`}
    >
      <div className="text-4xl font-bold text-teal-800">{value}</div>
      <div className="text-sm text-gray-700 mt-1">{label}</div>
    </motion.div>
  );
}

// Highlight Card Component
function HighlightCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <motion.div
      variants={cardVariant}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-gray-200 hover:border-teal-400"
      whileHover={{ scale: 1.03 }}
      role="listitem"
      aria-label={`Highlight: ${title}`}
    >
      <div className="mb-3" aria-hidden="true">{icon}</div>
      <h3 className="text-lg font-semibold text-teal-700 mb-1">{title}</h3>
      <p className="text-gray-600 text-sm mb-3">{description}</p>
      <Link href={link} className="text-sm text-blue-700 hover:underline font-medium" aria-label={`Learn more about ${title}`}>
        Learn more →
      </Link>
    </motion.div>
  );
}