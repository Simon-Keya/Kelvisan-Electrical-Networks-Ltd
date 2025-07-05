// app/admin/newsletter.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../lib/api';

// Re-define NewsletterSubscriber interface here for self-containment
interface NewsletterSubscriber {
  id?: number;
  email: string;
  created_at?: Date;
}

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
      const data = await apiRequest<NewsletterSubscriber[]>('/newsletter');
      setSubscribers(data);
    } catch (err: unknown) { // Changed 'any' to 'unknown'
      // Check if 'err' is an Error instance before accessing 'message'
      setError(err instanceof Error ? err.message : 'Failed to fetch newsletter subscribers.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading subscribers...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Newsletter Subscribers</h1>
      {subscribers.length === 0 ? (
        <p className="text-gray-600">No subscribers found yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscribed At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscribers.map((subscriber) => (
                <tr key={subscriber.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{subscriber.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subscriber.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subscriber.created_at ? new Date(subscriber.created_at).toLocaleDateString() : 'N/A'}
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
