'use client';

import { EnvelopeIcon, PencilSquareIcon, UserIcon } from '@heroicons/react/24/outline';
import emailjs from 'emailjs-com';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const SERVICE_ID = 'service_w0vaxqh';
  const TEMPLATE_ID = 'template_3qekbzp';
  const USER_ID = 'NiawJSFgdDfxZx5Wa';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all fields.');
      return;
    }

    setError('');
    setLoading(true);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams, USER_ID)
      .then(() => {
        toast.success('Message sent successfully! 🚀');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        toast.error('Failed to send message. Please try again.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="w-full">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-blue-200 max-w-2xl mx-auto backdrop-blur-md shadow-xl rounded-2xl p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-4">
          Let us Connect
        </h2>
        <p className="text-center text-black mb-8">
          Have a question or a project in mind? Fill in the form and we will respond shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="peer w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
            />
            <UserIcon className="absolute left-3 top-3.5 w-5 h-5 text-blue-400" />
            <label className="absolute left-11 top-2 text-sm text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-600">
              Your Name
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="peer w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
            />
            <EnvelopeIcon className="absolute left-3 top-3.5 w-5 h-5 text-blue-400" />
            <label className="absolute left-11 top-2 text-sm text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-600">
              Email Address
            </label>
          </div>

          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Your message..."
              rows={5}
              className="peer w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 bg-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm resize-none transition"
            />
            <PencilSquareIcon className="absolute left-3 top-3.5 w-5 h-5 text-blue-400" />
            <label className="absolute left-11 top-2 text-sm text-gray-500 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-gray-600">
              Your Message
            </label>
          </div>

          {error && (
            <p className="text-sm text-red-500 font-medium text-center animate-pulse">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            } bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-600 hover:to-indigo-500 text-white font-semibold py-3 rounded-full transition duration-300 shadow-md hover:shadow-lg tracking-wide`}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}
