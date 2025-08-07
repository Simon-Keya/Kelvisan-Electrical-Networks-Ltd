"use client";

import {
    Box,
    ChevronRight,
    Dices,
    Home,
    Layers3,
    LogOut,
    Menu,
    Settings,
    Users,
    X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Now importing usePathname
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
  const pathname = usePathname(); // Using usePathname to get the current URL path
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-blue-500 border-gray-200"></div>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Define sidebar navigation items
  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: Home, color: 'text-gray-500' },
    { name: 'Products', href: '/admin/products', icon: Box, color: 'text-blue-500' },
    { name: 'Categories', href: '/admin/category', icon: Layers3, color: 'text-green-500' },
    { name: 'Users', href: '/admin/users', icon: Users, color: 'text-purple-500' },
    { name: 'Settings', href: '/admin/settings', icon: Settings, color: 'text-gray-500' },
  ];

  // Component for the navigation sidebar
  const Sidebar = () => (
    <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-gray-900 text-white transition-transform duration-300 transform md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between h-20 px-6 bg-gray-800">
        <span className="text-2xl font-bold tracking-tight">Admin Panel</span>
        <button className="md:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
          <X size={24} />
        </button>
      </div>
      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} passHref legacyBehavior>
            <a className={`flex items-center p-3 rounded-xl transition-colors duration-200 ${pathname === item.href ? 'bg-blue-600 font-semibold' : 'hover:bg-gray-700'}`}>
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </a>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button className="w-full flex items-center p-3 text-red-400 rounded-xl hover:bg-gray-700 transition-colors duration-200">
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );

  // Component for the main content cards.
  const DashboardCards = () => (
    <main className="flex-1 p-4 sm:p-8 md:ml-64 transition-all duration-300">
      <div className="flex items-center justify-between md:hidden mb-4">
        <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <button className="text-gray-900" onClick={() => setIsSidebarOpen(true)}>
          <Menu size={32} />
        </button>
      </div>
      <div className="hidden md:block">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Admin Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Dashboard Card for Product Management */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl border-l-4 border-blue-500">
          <div className="flex items-center mb-4">
            <div className="text-blue-600 bg-blue-100 p-3 rounded-full">
              <Box className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 ml-4">
              Product Management
            </h2>
          </div>
          <p className="text-gray-600 text-sm flex-grow mb-5">
            Manage your inventory, add new items, and update product details efficiently.
          </p>
          <Link href="/admin/products" passHref>
            <a className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105">
              Go to Products
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </Link>
        </div>

        {/* Dashboard Card for Category Management */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl border-l-4 border-green-500">
          <div className="flex items-center mb-4">
            <div className="text-green-600 bg-green-100 p-3 rounded-full">
              <Layers3 className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 ml-4">
              Category Management
            </h2>
          </div>
          <p className="text-gray-600 text-sm flex-grow mb-5">
            Organize your products into logical categories for easy browsing and management.
          </p>
          <Link href="/admin/category" passHref>
            <a className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105">
              Go to Categories
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </Link>
        </div>

        {/* Dashboard Card for Newsletter Subscribers */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl border-l-4 border-purple-500">
          <div className="flex items-center mb-4">
            <div className="text-purple-600 bg-purple-100 p-3 rounded-full">
              <Users className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 ml-4">
              Newsletter Subscribers
            </h2>
          </div>
          <p className="text-gray-600 text-sm flex-grow mb-5">
            View and manage your newsletter subscriber list and send updates.
          </p>
          <Link href="/admin/newsletter" passHref>
            <a className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 transform hover:scale-105">
              View Subscribers
              <ChevronRight className="w-5 h-5 ml-2" />
            </a>
          </Link>
        </div>

        {/* Placeholder Card for future features */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl border-l-4 border-gray-400 opacity-60 cursor-not-allowed">
          <div className="flex items-center mb-4">
            <div className="text-gray-500 bg-gray-200 p-3 rounded-full">
              <Dices className="w-8 h-8" strokeWidth={1.5} />
            </div>
            <h2 className="text-xl font-bold text-gray-800 ml-4">
              Other Features
            </h2>
          </div>
          <p className="text-gray-600 text-sm flex-grow mb-5">
            Placeholder for future modules like Order Management, Analytics, etc.
          </p>
          <button disabled className="inline-flex items-center justify-center bg-gray-400 text-white font-semibold py-3 px-6 rounded-full cursor-not-allowed">
            Coming Soon
          </button>
        </div>
      </div>
    </main>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <DashboardCards />6
    </div>
  );
};

export default AdminDashboardPage;
