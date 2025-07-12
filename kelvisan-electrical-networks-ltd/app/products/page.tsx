// app/products/page.tsx
"use client" // This component uses client-side hooks like useState, useEffect
import Image from 'next/image'; // Import Next.js Image component for optimization
import Link from 'next/link'; // Import Link for navigation
import React, { useEffect, useState } from 'react';
import ProductDetailsModal from '../../components/ProductDetailModal'; // Import the new modal component
import { Product } from '../interfaces/Product'; // <--- IMPORT SHARED PRODUCT INTERFACE
import { apiRequest } from '../lib/api'; // Utility for making API calls

// Define a separate ProductCard component to manage its own state for description visibility
interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void; // New prop to handle opening the modal
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const phoneNumber = "+254711762682"; // Consider making this an environment variable or fetching from config

  return (
    <div
      key={product.id}
      className="bg-white rounded-xl shadow-md overflow-hidden
                 hover:shadow-xl hover:scale-102 transition-all duration-300
                 border border-gray-200 hover:border-blue-400 flex flex-col"
    >
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <Image // Using Next.js Image component for optimization
          src={product.image || 'https://placehold.co/400x300/e0e0e0/ffffff?text=No+Image'}
          alt={product.name}
          layout="fill" // Fills the parent div
          objectFit="cover" // Covers the area, cropping if necessary
          className="transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            console.error('Image loading error for product:', product.name, e.currentTarget.src);
          }}
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

        {/* Removed the in-card description logic */}
        {/* Removed spacer div */}

        {/* View Details Button - now opens the modal */}
        <button
          onClick={() => onViewDetails(product)} // Call the prop function
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-md mb-4"
        >
          View Details
        </button>

        {/* Call to Order Button - Hover effect only on this button */}
        <Link href="/contact" passHref className="mt-auto block group">
          <button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-md relative overflow-hidden"
          >
            {/* Span for "Call to Order" text - hides on button hover */}
            <span className="block group-hover:opacity-0 transition-opacity duration-300">Call to Order</span>
            {/* Span for Phone Number - shows on button hover */}
            <span className="absolute inset-0 flex items-center justify-center bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              {phoneNumber}
            </span>
          </button>
        </Link>
      </div>
    </div>
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
    <div className="container mx-auto px-4 py-8 sm:py-12 bg-white min-h-screen">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 sm:mb-12 text-center tracking-tight">
        Explore Our Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-10">
          No products available at the moment. Please check back later!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onViewDetails={handleViewDetails} />
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      <ProductDetailsModal
        show={showProductModal}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </div>
  );
};

export default PublicProductsPage;