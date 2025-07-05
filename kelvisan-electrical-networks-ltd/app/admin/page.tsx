// app/admin/page.tsx
import React from 'react';

const AdminDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Dashboard Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Products</h2>
          <p className="text-3xl font-bold text-blue-600">120</p>
          <p className="text-gray-500 text-sm mt-2">Manage products from the Products tab.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">New Subscribers</h2>
          <p className="text-3xl font-bold text-green-600">15</p>
          <p className="text-gray-500 text-sm mt-2">View details in the Newsletter tab.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Product Categories</h2>
          <p className="text-3xl font-bold text-purple-600">8</p>
          <p className="text-gray-500 text-sm mt-2">Organize products by categories.</p>
        </div>
        {/* Add more dashboard widgets as needed */}
      </div>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Add New Product
          </button>
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Manage Categories
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            View Subscribers
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
