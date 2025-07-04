// components/AdminLoginForm.tsx
"use client"
import React, { useState } from 'react';

// Define props for the login form component
interface AdminLoginFormProps {
  // Changed signature: now accepts email and password, and returns a Promise
  onLoginSuccess: (email: string, password: string) => Promise<void>;
  onLoginError: (message: string) => void; // Callback for login errors
  isLoading: boolean; // Prop to indicate if login is in progress
}

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({ onLoginSuccess, onLoginError, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => { // Made handleSubmit async
    e.preventDefault();
    if (!email.trim() || !password.trim()) { // Added trim for basic validation
      onLoginError('Please enter both email and password.');
      return;
    }
    // Pass the form data to the parent component's handler
    // The parent component (login.tsx) will handle the actual API call
    await onLoginSuccess(email, password); // Await the promise from onLoginSuccess
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out w-full disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
      </div>
    </form>
  );
};

export default AdminLoginForm;
