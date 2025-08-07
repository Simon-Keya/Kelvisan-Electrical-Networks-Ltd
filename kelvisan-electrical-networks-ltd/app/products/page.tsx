"use client"; // This component uses client-side hooks like useState, useEffect

import { motion } from 'framer-motion'; // Import motion for animations
import Image from 'next/image'; // Import Next.js Image component for optimization
import React, { useEffect, useState } from 'react';
import ProductDetailsModal from '../../components/ProductDetailModal'; // Corrected import name for consistency
import { Product } from '../interfaces/Product'; // <--- IMPORT SHARED PRODUCT INTERFACE
import { apiRequest } from '../lib/api'; // Utility for making API calls

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1, // Delay between child animations
      delayChildren: 0.2, // Delay before children start animating
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
};

// Define a separate ProductCard component to manage its own state for description visibility
interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  isModalOpenForThisProduct: boolean; // New prop: true if this product's modal is currently open
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, isModalOpenForThisProduct }) => {

  const handleWhatsAppOrder = () => {
    // Define the business's WhatsApp number and a pre-filled message
    // ⚠️ IMPORTANT: Replace this with your actual business WhatsApp number, including the country code
    const whatsappNumber = '254712345678';
    const prefilledMessage = `Hello, I would like to order the product: ${product.name}. Can you provide more details?`;

    // Encode the message to ensure it's a valid URL component
    const encodedMessage = encodeURIComponent(prefilledMessage);
    // Construct the full WhatsApp deep link URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    // Open the URL in a new browser tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div // Apply motion to the card for animation
      variants={itemVariants} // Use itemVariants for individual card animation
      className="bg-white rounded-xl shadow-md overflow-hidden
                 hover:shadow-xl hover:scale-102 transition-all duration-300
                 border border-gray-200 hover:border-blue-400 flex flex-col"
      tabIndex={0} // Make card focusable for accessibility
      role="listitem" // Semantic role for list items
      aria-label={`Product: ${product.name}`} // Aria label for screen readers
    >
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <Image // Using Next.js Image component for optimization
          src={product.image_url || 'https://placehold.co/400x300/e0e0e0/ffffff?text=No+Image'}
          alt={`Image of ${product.name}`} // Descriptive alt text for SEO and accessibility
          layout="fill" // Fills the parent div
          objectFit="cover" // Covers the area, cropping if necessary
          className="transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            console.error('Image loading error for product:', product.name, e.currentTarget.src);
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizing
          priority // Consider if these images are above the fold
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name - Ensure consistent height for uniformity */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2 min-h-[3rem] line-clamp-2">
          {product.name}
        </h2>

        {/* Price */}
        <div className="mb-2">
          <span className="text-2xl font-bold text-green-700">Ksh {(product.price as number || 0).toFixed(2)}</span>
        </div>

        {/* View Details Button - now opens the modal */}
        <button
          onClick={() => onViewDetails(product)} // Call the prop function
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-md mb-4"
          aria-haspopup="dialog" // Indicates the button opens a dialog
          aria-expanded={isModalOpenForThisProduct} // Corrected: reflects if *this* product's modal is open
        >
          View Details
        </button>

        {/* This button now calls the handleWhatsAppOrder function */}
        <button
          onClick={handleWhatsAppOrder}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-md mt-auto"
          aria-label={`Order ${product.name} via WhatsApp`} // Aria label for accessibility
        >
          Order via WhatsApp
        </button>
      </div>
    </motion.div>
  );
};


const PublicProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for the modal
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
        setProducts(parsedProducts);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on component mount

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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-600 animate-pulse">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <p className="text-xl text-red-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:py-12 bg-white min-h-screen" role="main"> {/* Use main for semantic HTML */}
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 sm:mb-12 text-center tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Explore Our Products
      </motion.h1>

      {products.length === 0 ? (
        <motion.p
          className="text-center text-gray-600 text-lg py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          No products available at the moment. Please check back later!
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch"
          variants={containerVariants} // Apply container variants to the grid
          initial="hidden"
          animate="visible" // Animate on mount
          // Consider using whileInView if you want animation to trigger on scroll
          // whileInView="visible"
          // viewport={{ once: true, amount: 0.2 }}
          role="list" // Semantic role for list of products
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={handleViewDetails}
              isModalOpenForThisProduct={selectedProduct?.id === product.id && showProductModal} // Pass modal state for this specific product
            />
          ))}
        </motion.div>
      )}

      {/* Product Details Modal */}
      <ProductDetailsModal
        show={showProductModal}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </main>
  );
};

export default PublicProductsPage;
