// app/admin/newsletter.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { NewsletterSubscriber } from '../../interfaces/Product'; // Import from shared interfaces
import { apiRequest } from '../../lib/api';

const NewsletterPage: React.FC = () => {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming this API endpoint requires authentication for admin access
      const data = await apiRequest<NewsletterSubscriber[]>('/newsletter');
      setSubscribers(data);
    } catch (err: unknown) {
      console.error('Error fetching newsletter subscribers:', err); // More specific console log
      setError(err instanceof Error ? err.message : 'Failed to fetch newsletter subscribers.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-600 animate-pulse">Loading subscribers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <p className="text-xl text-red-700">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12"> {/* Added responsive padding */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">Newsletter Subscribers</h1> {/* Adjusted font size and margin */}
      {subscribers.length === 0 ? (
        <p className="text-center text-gray-600 text-lg py-10">No subscribers found yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200"> {/* Added shadow and border */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subscribed At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subscriber.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{subscriber.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {subscriber.subscribed_at ? new Date(subscriber.subscribed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'} {/* Formatted date */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default NewsletterPage;