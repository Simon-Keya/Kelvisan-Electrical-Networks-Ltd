'use client'
import SubscribeForm from '../../components/SubscribeForm';

export default function SubscribePage() {
  return (
    <main className="p-8 flex items-center justify-center min-h-screen bg-gradient-to-b from-white via-teal-50 to-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Subscribe to our Newsletter</h1>
        <SubscribeForm />
      </div>
    </main>
  );
}
