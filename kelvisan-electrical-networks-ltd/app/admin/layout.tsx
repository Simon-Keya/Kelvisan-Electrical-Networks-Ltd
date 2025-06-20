import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const cookieStore = await cookies(); // ⬅️ ADD await here
  const token = cookieStore.get('token')?.value;

  // Redirect to login if token is missing
  if (!token) {
    redirect('/admin/login');
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Kelvisan Admin Dashboard</h1>
          <form action="/admin/logout" method="POST">
            <button className="btn btn-sm btn-outline btn-error">Logout</button>
          </form>
        </header>
        <section>{children}</section>
      </div>
    </main>
  );
}
