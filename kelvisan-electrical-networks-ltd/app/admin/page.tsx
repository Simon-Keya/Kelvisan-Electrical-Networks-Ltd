// app/admin/page.tsx
"use client"; // This component uses client-side features like navigation links

import React from 'react';
// Assuming you have a way to navigate, e.g., Next.js Link or direct anchor tags
// For a simple example, we'll use anchor tags. In a Next.js project, you'd use <Link href="...">
// import Link from 'next/link';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Product Management Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="text-blue-600 text-5xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Product Management</h2>
          <p className="text-gray-600 mb-5">Manage your inventory, add new products, update details, and handle stock.</p>
          <a
            href="/admin/products" // Use Link in Next.js: <Link href="/admin/products" passHref><button ...>Go to Products</button></Link>
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            Go to Products
          </a>
        </div>

        {/* Category Management Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 hover:shadow-xl">
          <div className="text-green-600 text-5xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c.325-.324.652-.65.98-.98a3 3 0 10-5.78-1.127zM20.58 9.75a3 3 0 10-3.254 3.254l3.254-3.254z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-3">Category Management</h2>
          <p className="text-gray-600 mb-5">Organize your products into categories for better navigation and filtering.</p>
          <a
            href="/admin/categories" // Use Link in Next.js: <Link href="/admin/categories" passHref><button ...>Go to Categories</button></Link>
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300"
          >
            Go to Categories
          </a>
        </div>

        {/* Placeholder for other admin sections (e.g., User Management, Orders) */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center opacity-70 cursor-not-allowed">
          <div className="text-gray-400 text-5xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-500 mb-3">Other Sections</h2>
          <p className="text-gray-400 mb-5">Coming Soon: User Management, Order Processing, and more!</p>
          <button
            disabled
            className="bg-gray-400 text-white font-bold py-2 px-6 rounded-full shadow-md cursor-not-allowed"
          >
            Coming Soon
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;
