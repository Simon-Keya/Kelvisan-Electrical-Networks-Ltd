// app/products/page.tsx
"use client" // This component uses client-side hooks like useState, useEffect
import React, { useEffect, useState } from 'react';
import { apiRequest } from '../lib/api'; // Utility for making API calls

// Define Product interface (simplified for public view if needed, but keeping consistent)
interface Product {
  id: number;
  name: string;
  image: string; // URL of the product image
  description: string;
  price: number;
  category_name?: string | null; // For display
}

const PublicProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch products. This endpoint might not require authentication on the backend.
        // If your backend's /products endpoint requires authentication,
        // you'll need a separate public endpoint or handle the 401 gracefully without redirecting.
        const data = await apiRequest<Product[]>('/products');
        setProducts(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-8 text-gray-600">Loading products...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Our Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products available at the moment. Please check back later!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={product.image || 'https://placehold.co/400x300/e0e0e0/ffffff?text=No+Image'}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).onerror = null; // Prevent infinite loop
                  (e.target as HTMLImageElement).src = 'https://placehold.co/400x300/e0e0e0/ffffff?text=Image+Error';
                }}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">{product.name}</h2>
                {product.category_name && (
                  <p className="text-sm text-blue-600 mb-1">{product.category_name}</p>
                )}
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-700">${product.price.toFixed(2)}</span>
                  {/* You can add a "View Details" or "Add to Cart" button here */}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300">
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
