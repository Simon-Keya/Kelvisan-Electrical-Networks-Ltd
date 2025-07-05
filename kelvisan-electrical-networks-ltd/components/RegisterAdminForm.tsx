// components/RegisterAdminForm.tsx
"use client"
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
      // Use the errorMessage prop for this, handled by the parent component
      return; // Prevent submission if validation fails
    }
    await onRegisterSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register New Admin</h2>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
          {errorMessage}
        </div>
      )}

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
          {isLoading ? 'Registering...' : 'Register Admin'}
        </button>
      </div>
    </form>
  );
};

export default RegisterAdminForm;
