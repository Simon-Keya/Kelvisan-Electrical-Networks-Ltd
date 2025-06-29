'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginAdmin } from '../app/lib/api';

export default function AdminLoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setIsLoading(true);

  const result = await loginAdmin(form.email, form.password);

  if (result.success) {
    router.push('/admin');
  } else {
    setError(`❌ ${result.error}`);
  }

  setIsLoading(false);
};


  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-blue-200 px-4 py-12">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 sm:p-10 rounded-xl shadow-lg space-y-6 border border-blue-100"
      >
        <div className="flex justify-center">
          <div className="bg-blue-100 p-3 rounded-full shadow-sm animate-fade-in">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.105 0 2-.672 2-1.5S13.105 8 12 8s-2 .672-2 1.5S10.895 11 12 11zm0 0v1.5m0 0H9.5a2.5 2.5 0 00-2.5 2.5v.5h10v-.5a2.5 2.5 0 00-2.5-2.5H12z" />
            </svg>
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1">Sign in to manage the system</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-3 rounded border border-red-300 text-center">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="admin@example.com"
            className="input input-bordered w-full focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="input input-bordered w-full focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 shadow-md hover:shadow-xl transition duration-200 flex justify-center items-center gap-2 ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner text-white" />
              Logging in...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
              Login
            </>
          )}
        </button>

        <p className="text-center text-xs text-gray-400 mt-6">
          &copy; {new Date().getFullYear()} Kelvisan Electrical Networks Ltd
        </p>
      </form>
    </section>
  );
}
