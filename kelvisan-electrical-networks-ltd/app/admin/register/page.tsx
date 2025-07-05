// app/admin/register.tsx
"use client" // Added for Next.js App Router compatibility if applicable
import { useRouter } from 'next/navigation'; // Changed from 'react-router-dom' to 'next/navigation'
import React, { useState } from 'react';
import RegisterAdminForm from '../../../components/RegisterAdminForm'; // Corrected path to components directory
import { apiRequest } from '../../lib/api'; // Assuming api.ts is in lib/

const RegisterAdminPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter(); // Changed from useNavigate() to useRouter()

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
    setMessage(null); // Clear previous messages
    setIsSuccess(false);

    try {
      // Make an authenticated API request to register a new admin
      // This assumes the /auth/register endpoint is protected by authenticateAdmin middleware
      const response = await apiRequest<{ id: number; email: string }>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      setMessage(`Admin "${response.email}" registered successfully with ID: ${response.id}`);
      setIsSuccess(true);
      // Optionally, clear form fields after successful registration
      // This would require passing a reset function from here to RegisterAdminForm
      // For now, the form component manages its own state, so it won't clear automatically.
      // If you want to clear, you'd need to lift email/password state to this component.

      // Redirect after a short delay using Next.js router
      setTimeout(() => router.push('/admin'), 2000); // Redirect to admin dashboard on success
    } catch (err: unknown) { // Use 'unknown' for better type safety
      setMessage(err instanceof Error ? err.message : 'Failed to register admin.');
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-md mx-auto">
        {message && (
          <div
            className={`px-4 py-3 rounded-lg mb-4 ${
              isSuccess ? 'bg-green-100 border border-green-400 text-green-700' : 'bg-red-100 border border-red-400 text-red-700'
            }`}
            role="alert"
          >
            {message}
          </div>
        )}
        <RegisterAdminForm
          onRegisterSubmit={handleRegister}
          isLoading={isLoading}
          errorMessage={message && !isSuccess ? message : null} // Pass error message to form
        />
      </div>
    </div>
  );
};

export default RegisterAdminPage;
