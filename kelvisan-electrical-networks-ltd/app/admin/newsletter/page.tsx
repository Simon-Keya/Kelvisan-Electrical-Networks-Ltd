'use client';
import { useEffect, useState } from 'react';
import { fetchSubscribers } from '../../lib/api';

export default function AdminNewsletter() {
  const [emails, setEmails] = useState<string[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSubscribers()
      .then(setEmails)
      .catch(() => setError('Failed to fetch subscribers.'));
  }, []);

  return (
    <main className="min-h-screen bg-base-200 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">Newsletter Subscribers</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="bg-white shadow-lg p-6 rounded-lg space-y-2">
        {emails.length === 0 ? (
          <p className="text-gray-500 italic">No subscribers yet.</p>
        ) : (
          emails.map((email, i) => (
            <li key={i} className="text-sm text-teal-800 border-b last:border-b-0 py-1">{email}</li>
          ))
        )}
      </ul>
    </main>
  );
}
