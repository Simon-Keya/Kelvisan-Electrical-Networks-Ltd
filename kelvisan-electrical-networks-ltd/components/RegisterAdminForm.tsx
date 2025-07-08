// components/RegisterAdminForm.tsx
"use client"
import Link from 'next/link'; // Import Link for Next.js navigation
import React, { useState } from 'react';

// Define props for the reusable registration form component
interface RegisterAdminFormProps {
  onRegisterSubmit: (email: string, password: string) => Promise<void>; // Callback for form submission
  isLoading: boolean; // Prop to indicate if registration is in progress
  errorMessage?: string | null; // Optional error message to display
}

const RegisterAdminForm: React.FC<RegisterAdminFormProps> = ({
  onRegisterSubmit,
  isLoading,
  errorMessage,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation
    if (!email.trim() || !password.trim()) {
      // The parent component (register.tsx) handles displaying the error message
      // so we just return here if validation fails.
      return;
    }
    await onRegisterSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-10 rounded-xl shadow-2xl max-w-md w-full border border-gray-200">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">Register New Admin</h2>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
          {errorMessage}
        </div>
      )}

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
          placeholder="new.admin@example.com"
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
          {isLoading ? 'Registering...' : 'Register Admin'}
        </button>
      </div>

      {/* Link to Login Page */}
      <p className="text-center text-gray-600 text-sm mt-6">
        Already have an admin account?{' '}
        <Link href="/admin/login" className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition duration-200">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterAdminForm;
