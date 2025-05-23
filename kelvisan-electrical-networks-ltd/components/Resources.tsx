'use client';

import Link from 'next/link';

const resources = [
  {
    title: 'Network Security Guide',
    description: 'A comprehensive guide for implementing robust security measures for network infrastructure and operations.',
    category: 'Security',
    size: '2.4 MB',
    updated: 'May 1, 2025',
  },
  {
    title: 'IPv6 Migration Checklist',
    description: 'Step-by-step guide to transitioning your infrastructure from IPv4 to IPv6 with minimal disruption.',
    category: 'Technical',
    size: '1.8 MB',
    updated: 'April 15, 2025',
  },
  {
    title: 'ICT Policy Briefs',
    description: 'Analysis of recent regulatory developments in Kenya’s ICT sector with implications for service providers.',
    category: 'Policy',
    size: '3.2 MB',
    updated: 'April 22, 2025',
  },
  {
    title: 'Technical Documentation',
    description: 'Detailed technical specifications and best practices for network operators in the Kenyan market.',
    category: 'Technical',
    size: '5.1 MB',
    updated: 'April 28, 2025',
  },
  {
    title: 'Cybersecurity Best Practices',
    description: 'Key practices to protect network infrastructure against common cyber threats.',
    category: 'Security',
    size: '2.7 MB',
    updated: 'March 30, 2025',
  },
  {
    title: 'Peering Guidelines',
    description: 'Best practices for establishing peering agreements with local and international partners.',
    category: 'Technical',
    size: '1.5 MB',
    updated: 'March 15, 2025',
  },
  {
    title: 'Regulatory Compliance Framework',
    description: 'Comprehensive framework for complying with Kenyan ICT regulations.',
    category: 'Policy',
    size: '4.2 MB',
    updated: 'February 28, 2025',
  },
  {
    title: 'Network Performance Optimization',
    description: 'Techniques and tools for maximizing network speed and efficiency.',
    category: 'Technical',
    size: '3.8 MB',
    updated: 'February 15, 2025',
  },
];

export default function ResourcesPage() {
  return (
    <section className="min-h-screen py-20 px-6 lg:px-24 bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-4 text-teal-700">Resources</h1>
        <p className="text-lg text-gray-600 mb-10">
          Access technical documentation, policy briefs, guides, and other resources curated by Kelvisan Electrical Networks Ltd.
        </p>

        {/* Search Placeholder */}
        <input
          type="text"
          placeholder="Search resources..."
          className="input input-bordered w-full max-w-xl mb-10"
        />

        {/* Featured Resources */}
        <h2 className="text-2xl font-bold mb-4 text-teal-600">Featured Resources</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {resources.slice(0, 4).map((resource, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="text-sm font-medium text-teal-700 mb-2">{resource.category}</div>
              <h3 className="text-xl font-semibold mb-1">{resource.title}</h3>
              <p className="text-gray-600 mb-3">{resource.description}</p>
              <button className="btn btn-sm btn-outline btn-primary">Download PDF</button>
            </div>
          ))}
        </div>

        {/* All Resources */}
        <h2 className="text-2xl font-bold mb-4 text-teal-600">All Resources</h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="table table-zebra">
            <thead className="bg-teal-100 text-teal-900">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Size</th>
                <th>Updated</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {resources.map((resource, index) => (
                <tr key={index}>
                  <td>{resource.title}</td>
                  <td>{resource.category}</td>
                  <td>{resource.size}</td>
                  <td>{resource.updated}</td>
                  <td>
                    <button className="btn btn-xs btn-outline btn-primary">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-yellow-100 rounded-lg p-10 text-center">
          <h3 className="text-2xl font-bold text-teal-800 mb-2">Need Additional Resources?</h3>
          <p className="text-gray-700 mb-4">
            If you can not find what you are looking for, get in touch with us. We're constantly updating our resource library to better serve our partners.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <Link href="/contact">
              <button className="btn btn-outline btn-primary">Contact Us</button>
            </Link>
            <Link href="/about">
              <button className="btn btn-primary bg-yellow-400 text-teal-900 border-none hover:bg-yellow-300">Join Kelvisan</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
