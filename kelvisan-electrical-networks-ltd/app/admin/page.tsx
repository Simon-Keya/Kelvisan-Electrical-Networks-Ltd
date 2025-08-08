'use client';

import {
  Box,
  ChevronRight,
  Home,
  Layers3,
  Menu,
  Users,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

// Assuming this utility exists and returns a boolean
const isAuthenticated = () => {
  // In a real app, this would check a token in local storage or a cookie.
  // For this example, we'll just return true to simulate a logged-in user.
  return true;
};

// Main component for the admin dashboard page.
const AdminDashboardPage: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Authentication check on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin/login');
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  // If auth check is not complete, show a loading state
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50 text-gray-800 transition-colors duration-300">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-teal-500 border-gray-200"></div>
          <p className="mt-4 text-xl text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Define sidebar navigation items
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: Home, color: 'text-gray-500' },
    { name: 'Products', href: '/admin/products', icon: Box, color: 'text-teal-500' },
    { name: 'Categories', href: '/admin/category', icon: Layers3, color: 'text-orange-500' },
    { name: 'Subscribers', href: '/admin/newsletter', icon: Users, color: 'text-blue-500' },
  ];

  
  // Component for the navigation sidebar
  const Sidebar = () => (
    <aside
      className={`fixed top-10 h-[calc(100vh-4rem)] md:relative md:h-full flex-shrink-0 w-64 bg-white shadow-lg text-gray-800 transition-transform duration-300 transform md:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } z-40`}
    >
      {/* This top section serves as a brand/header area for the sidebar on larger screens */}
      <div className="hidden md:flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <span className="text-2xl font-bold tracking-tight text-teal-700">Admin Panel</span>
      </div>

      {/* Mobile close button */}
      <div className="flex items-center justify-end h-16 px-6 border-b border-gray-200 md:hidden">
        <button className="text-gray-400 hover:text-gray-600" onClick={() => setIsSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} passHref legacyBehavior>
            <a
              className={`flex items-center p-3 rounded-xl transition-colors duration-200 ${
                pathname === item.href
                  ? 'bg-teal-100 text-teal-700 font-semibold shadow'
                  : 'hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </a>
          </Link>
        ))}
      </nav>
    </aside>
  );

  // Component for the main content cards.
  const DashboardCards = () => (
    <main className="flex-1 p-4 sm:p-8 bg-gray-50 min-h-full">
      {/* Mobile header and menu button */}
      <div className="flex items-center justify-between md:hidden mb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <button className="text-gray-900" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={32} />
        </button>
      </div>

      {/* Desktop header */}
      <div className="hidden md:block">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Admin Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Dashboard Card for Product Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border-l-4 border-teal-500">
          <div className="flex items-center mb-4">
            <div className="text-teal-600 bg-teal-100 p-3 rounded-full">
              <Box className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 ml-4">Product Management</h2>
          </div>
          <p className="text-gray-600 text-sm flex-grow mb-5">
            Manage your inventory, add new items, and update product details efficiently.
          </p>
          <Link href="/admin/products" passHref>
            <a className="inline-flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105">
              Go to Products
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </Link>
        </div>

        {/* Dashboard Card for Category Management */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border-l-4 border-orange-500">
          <div className="flex items-center mb-4">
            <div className="text-orange-600 bg-orange-100 p-3 rounded-full">
              <Layers3 className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 ml-4">Category Management</h2>
          </div>
          <p className="text-gray-600 text-sm flex-grow mb-5">
            Organize your products into logical categories for easy browsing and management.
          </p>
          <Link href="/admin/category" passHref>
            <a className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105">
              Go to Categories
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </Link>
        </div>

        {/* Dashboard Card for Newsletter Subscribers */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="text-blue-600 bg-blue-100 p-3 rounded-full">
              <Users className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 ml-4">Subscribers</h2>
          </div>
          <p className="text-gray-600 text-sm flex-grow mb-5">
            View and manage your newsletter subscriber list and send updates.
          </p>
          <Link href="/admin/newsletter" passHref>
            <a className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105">
              View Subscribers
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </main>
  );

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen pt-10">
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-75 z-30"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <Sidebar />
      <DashboardCards />
    </div>
  );
};

export default AdminDashboardPage;
