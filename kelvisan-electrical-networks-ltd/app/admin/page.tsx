// app/admin/page.tsx
"use client"; // This component uses client-side features like navigation links

import { useRouter } from 'next/navigation'; // Import useRouter
import React, { useEffect } from 'react'; // Import useEffect
import { isAuthenticated } from '../lib/auth'; // Import isAuthenticated

const AdminDashboardPage: React.FC = () => {
  const router = useRouter();

  // Authentication check: Redirect to login if not authenticated
  useEffect(() => {
    // This check runs on the client side after hydration
    if (!isAuthenticated()) {
      router.push('/admin/login'); // Redirect to login page
    }
  }, [router]); // Re-run effect if router object changes

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">Admin Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Card: Product Management */}
        <div className="bg-white rounded-xl shadow-lg p-7 flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-b-4 border-blue-500">
          <div className="text-blue-600 text-6xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Product Management</h2>
          <p className="text-gray-600 text-base mb-6">Manage your inventory, add new items, and update product details.</p>
          <a
            href="/admin/products"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Go to Products
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Card: Category Management */}
        <div className="bg-white rounded-xl shadow-lg p-7 flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-b-4 border-green-500">
          <div className="text-green-600 text-6xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c.325-.324.652-.65.98-.98a3 3 0 10-5.78-1.127zM20.58 9.75a3 3 0 10-3.254 3.254l3.254-3.254z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Category Management</h2>
          <p className="text-gray-600 text-base mb-6">Organize your products into logical categories for easy browsing.</p>
          <a
            href="/admin/category"
            className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            Go to Categories
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Card: Newsletter Subscribers */}
        <div className="bg-white rounded-xl shadow-lg p-7 flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-b-4 border-purple-500">
          <div className="text-purple-600 text-6xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mx-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-2.244 2.244H3.939a2.25 2.25 0 01-2.244-2.244V9m18.375 0a2.25 2.25 0 00-2.244-2.244H5.439m18.375 0a2.25 2.25 0 01-2.244 2.244H2.439m0 0V3.66A2.25 2.25 0 013.66 1.5h16.68a2.25 2.25 0 012.244 2.16v5.298m-18.375 0h.008v.008H2.439m0 0V9.75m7.5-6H12H7.5M2.439 9.75a2.25 2.25 0 012.244 2.244H19.561a2.25 2.25 0 012.244-2.244m0 0V9.75m-9.75 0V3.66A2.25 2.25 0 0012 1.5h-1.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Newsletter Subscribers</h2>
          <p className="text-gray-600 text-base mb-6">Manage your newsletter subscribers and send out updates.</p>
          <a
            href="/admin/newsletter"
            className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105"
          >
            View Subscribers
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Removed Card: Admin Accounts (Register Admin) */}

      </div>
    </div>
  );
};

export default AdminDashboardPage;
