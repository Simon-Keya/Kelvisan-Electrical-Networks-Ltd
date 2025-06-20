'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginAdmin } from '../app/lib/api';

export default function AdminLoginForm() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await loginAdmin(email, pwd);
      if (res.ok) {
        router.push('/admin');
      } else {
        throw new Error('Unauthorized');
      }
    } catch {
      setErr('❌ Login failed – check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <form
        onSubmit={handle}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 space-y-6 border border-gray-200"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-sm text-gray-500">Enter your credentials to access the dashboard</p>
        </div>

        {err && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-300 text-sm">
            {err}
          </div>
        )}

        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700">Email</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-gray-700">Password</span>
          </label>
          <input
            type="password"
            className="input input-bordered w-full"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm text-white"></span>
          ) : (
            'Log In'
          )}
        </button>
      </form>
    </div>
  );
}
