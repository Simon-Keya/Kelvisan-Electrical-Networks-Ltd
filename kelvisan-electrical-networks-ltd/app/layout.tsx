// app/layout.tsx
import { Footer } from '../components/Footer';
import { Navbar } from '../components/Navbar';
import './globals.css';

export const metadata = {
  title: 'KELVISAN ELECTRICAL NETWORKS LIMITED',
  description: 'ELECTRICAL, NETWORKING AND SOFTWARE SOLUTIONS FOR YOUR BUSSINESS',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-base-100 text-base-content font-sans min-h-screen flex flex-col">
        <Navbar />
        {/* Added padding-top to offset the fixed navbar height */}
        <main className="flex-1 w-full px-0 sm:px-0 md:px-0 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
