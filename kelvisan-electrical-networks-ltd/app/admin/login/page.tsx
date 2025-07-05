// app/admin/login.tsx
"use client"
import { useRouter } from 'next/navigation'; // Changed from 'react-router-dom' to 'next/navigation'
import React, { useEffect, useState } from 'react';
import AdminLoginForm from '../../../components/AdminLoginForm';
import { apiRequest } from '../../lib/api';
import { isAuthenticated, setAuthToken } from '../../lib/auth';

const LoginPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Changed from useNavigate() to useRouter()

  // Check if already authenticated on component mount
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/admin'); // Redirect to dashboard if already logged in using Next.js router
    }
  }, [router]);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call your backend login endpoint
      const response = await apiRequest<{ token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.token) {
        setAuthToken(response.token);
        router.push('/admin'); // Redirect to admin dashboard on success using Next.js router
      } else {
        setError('Login failed: No token received.');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
            {error}
          </div>
        )}
        <AdminLoginForm
          onLoginSuccess={handleLogin}
          onLoginError={setError}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default LoginPage;
