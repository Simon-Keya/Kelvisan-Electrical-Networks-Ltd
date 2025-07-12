// app/admin/page.tsx
"use client"; // This component uses client-side features like navigation links

import Link from 'next/link'; // Import Link for client-side navigation
import { useRouter } from 'next/navigation'; // Import useRouter
import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { isAuthenticated } from '../lib/auth'; // Import isAuthenticated

// Import Heroicons for better maintainability and consistency than inline SVGs
import {
  ArrowRightIcon // For the "Go to" button arrows
  ,
  CubeTransparentIcon, // Used for Categories
  EnvelopeIcon, // Used for Products
  TagIcon
} from '@heroicons/react/24/outline';


const AdminDashboardPage: React.FC = () => {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false); // State to track if auth check is complete

  // Authentication check: Redirect to login if not authenticated
  useEffect(() => {
    // This check runs on the client side after hydration
    if (!isAuthenticated()) {
      router.push('/admin/login'); // Redirect to login page
    } else {
      setAuthChecked(true); // Mark auth check as complete if authenticated
    }
  }, [router]); // Re-run effect if router object changes

  // Show a loading state until authentication check is complete
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl text-gray-600 animate-pulse">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12"> {/* Adjusted vertical padding */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">Admin Dashboard</h1> {/* Reduced font size */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"> {/* Adjusted gap */}

        {/* Card: Product Management */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:scale-103 hover:shadow-xl border-b-4 border-blue-500"> {/* Adjusted padding, shadow, scale */}
          <div className="text-blue-600 text-5xl mb-3"> {/* Reduced icon size */}
            <CubeTransparentIcon className="w-16 h-16 mx-auto" /> {/* Used Heroicon */}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Management</h2> {/* Reduced font size */}
          <p className="text-gray-600 text-sm mb-5">Manage your inventory, add new items, and update product details efficiently.</p> {/* Reduced font size, adjusted margin */}
          <Link href="/admin/products" passHref>
            <button
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105 text-sm"
            > {/* Adjusted padding, font size */}
              Go to Products
              <ArrowRightIcon className="w-4 h-4 ml-2" /> {/* Used Heroicon */}
            </button>
          </Link>
        </div>

        {/* Card: Category Management */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:scale-103 hover:shadow-xl border-b-4 border-green-500">
          <div className="text-green-600 text-5xl mb-3">
            <TagIcon className="w-16 h-16 mx-auto" /> {/* Used Heroicon */}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Category Management</h2>
          <p className="text-gray-600 text-sm mb-5">Organize your products into logical categories for easy browsing and management.</p>
          <Link href="/admin/category" passHref>
            <button
              className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105 text-sm"
            >
              Go to Categories
              <ArrowRightIcon className="w-4 h-4 ml-2" /> {/* Used Heroicon */}
            </button>
          </Link>
        </div>

        {/* Card: Newsletter Subscribers */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center justify-center text-center transition-all duration-300 transform hover:scale-103 hover:shadow-xl border-b-4 border-purple-500">
          <div className="text-purple-600 text-5xl mb-3">
            <EnvelopeIcon className="w-16 h-16 mx-auto" /> {/* Used Heroicon */}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Newsletter Subscribers</h2>
          <p className="text-gray-600 text-sm mb-5">View and manage your newsletter subscriber list and send updates.</p>
          <Link href="/admin/newsletter" passHref>
            <button
              className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105 text-sm"
            >
              View Subscribers
              <ArrowRightIcon className="w-4 h-4 ml-2" /> {/* Used Heroicon */}
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboardPage;