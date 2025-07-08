// components/AdminLoginForm.tsx
"use client"
import Link from 'next/link'; // Import Link for Next.js navigation
import React, { useState } from 'react';

// Define props for the login form component
interface AdminLoginFormProps {
  onLoginSuccess: (email: string, password: string) => Promise<void>;
  onLoginError: (message: string) => void; // Callback for login errors
  isLoading: boolean; // Prop to indicate if login is in progress
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onLoginSuccess, onLoginError, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      onLoginError('Please enter both email and password.');
      return;
    }
    await onLoginSuccess(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Admin Login</h2>
      
      <div className="mb-6">
        <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
          placeholder="admin@example.com"
        />
      </div>
      
      <div className="mb-8">
        <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
          placeholder="••••••••"
        />
      </div>
      
      <div className="flex items-center justify-center mb-6">
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out w-full disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
      </div>

      {/* Link to Register Page */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Do not have an admin account?{' '}
        <Link href="/admin/register" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition duration-200">
          Register 
        </Link>
      </p>
    </form>
  );
};

export default AdminLoginForm;
