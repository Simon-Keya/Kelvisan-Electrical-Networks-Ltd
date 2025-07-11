// app/products/page.tsx
"use client" // This component uses client-side hooks like useState, useEffect
import Image from 'next/image'; // Import Next.js Image component for optimization
import React, { useEffect, useState } from 'react';
import { Product } from '../interfaces/Product'; // <--- IMPORT SHARED PRODUCT INTERFACE
import { apiRequest } from '../lib/api'; // Utility for making API calls

const PublicProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch products. This endpoint is assumed to NOT require authentication on the backend.
        // We explicitly set isAuthenticatedRequest: false to prevent sending Authorization header
        // and avoid redirects to admin login for public users.
        const data = await apiRequest<Product[]>('/products', { isAuthenticatedRequest: false });

        // CRUCIAL FIX: Parse price to a number after fetching from the backend.
        // The 'price' might come as a string from PostgreSQL's NUMERIC type.
        const parsedProducts = data.map(product => ({
          ...product,
          // Use parseFloat to convert price to a number. .toString() ensures it's a string first if needed.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden
                         hover:shadow-xl hover:scale-102 transition-all duration-300
                         border border-gray-100 hover:border-blue-300 flex flex-col"
            >
              <div className="relative w-full h-48 sm:h-56 overflow-hidden">
                <Image // Using Next.js Image component for optimization
                  src={product.image || 'https://placehold.co/400x300/e0e0e0/ffffff?text=No+Image'}
                  alt={product.name}
                  layout="fill" // Fills the parent div
                  objectFit="cover" // Covers the area, cropping if necessary
                  className="transition-transform duration-300 hover:scale-105"
                  // Next.js Image handles onError more gracefully, but you can still provide a fallback src
                  // For Image component, you might manage a fallback state if the URL is truly bad.
                  // For simplicity, the placeholder in src will act as a fallback if the original fails.
                  // Note: `onError` on `next/image` is for logging, not directly changing `src` like `<img>`.
                  // If you need a dynamic fallback, manage it with state.
                  onError={(e) => {
                    console.error('Image loading error for product:', product.name, e.currentTarget.src);
                    // A more advanced fallback for Next.js Image might involve
                    // setting a state to switch to a local placeholder image.
                  }}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h2>
                {product.category_name && (
                  <p className="text-sm text-blue-600 mb-1 font-medium">
                    Category: {product.category_name}
                  </p>
                )}
                <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">{product.description}</p>
                <div className="mt-auto flex justify-between items-center pt-2">
                  {/* Ensure product.price is treated as a number for toFixed */}
                  <span className="text-2xl font-bold text-green-700">${(product.price as number || 0).toFixed(2)}</span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-md">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicProductsPage;
