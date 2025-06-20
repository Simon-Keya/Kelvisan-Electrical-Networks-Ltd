'use client'
import { useState } from 'react';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    setStatus(res.ok ? 'Thanks for subscribing!' : 'Subscription failed.');
    setEmail('');
  };

  return (
    <form onSubmit={subscribe} className="grid gap-4">
      <input
        type="email" placeholder="Email Address"
        className="input input-bordered w-full" required
        value={email} onChange={e => setEmail(e.target.value)}
      />
      <button type="submit" className="btn btn-accent">Subscribe</button>
      {status && <p className="mt-2 text-sm">{status}</p>}
    </form>
  );
}
