import { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-200 text-gray-800 px-6 py-8">
      <div className="w-full max-w-screen-2xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow-lg px-8 py-6 rounded-xl border border-gray-200">
          <h1 className="text-3xl font-bold text-blue-700 tracking-tight">
            Kelvisan Admin Dashboard
          </h1>
        </header>

        {/* Main Content */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg border border-gray-100 transition-all duration-200 ease-in-out">
          {children}
        </section>
      </div>
    </main>
  );
}
