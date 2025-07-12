// components/Subscribe.tsx
"use client"; // This component uses client-side hooks

import React, { useState } from 'react';
// Correct the import path for api.ts based on its location relative to components/
// If api.ts is in lib/ at the root of your app, the path should be '../../lib/api'
import { apiRequest } from '../app/lib/api'; // Corrected path to apiRequest utility

const Subscribe: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setMessage(null);
    setError(null);

    // Basic client-side email validation
    if (!email.trim()) {
      setError('Email address cannot be empty.');
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      // Make an API call to your backend's newsletter subscription endpoint
      // CORRECTED: Changed endpoint to '/newsletter/subscribe'
      await apiRequest('/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
        isAuthenticatedRequest: false, // Newsletter subscription typically doesn't require auth
      });

      setMessage('Thank you for subscribing to our newsletter!');
      setEmail(''); // Clear the email input on success
    } catch (err: unknown) {
      // Handle API errors
      console.error('Subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 w-full max-w-md mx-auto animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
        Subscribe to Our Newsletter
      </h2>
      <p className="text-gray-600 mb-6 text-center text-sm sm:text-base">
        Stay updated with our latest products, offers, and news!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input
            type="email"
            id="email"
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 placeholder-gray-400"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm" role="alert">
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
    </div>
  );
};

export default Subscribe;