'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import AdminLoginForm from '../../../components/AdminLoginForm';
import { isAuthenticated } from '../../lib/auth';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.replace('/admin');
    }
  }, [router]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <AdminLoginForm />
    </main>
  );
}
