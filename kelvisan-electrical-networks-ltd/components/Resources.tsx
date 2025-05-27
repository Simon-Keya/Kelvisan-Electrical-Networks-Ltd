'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineDownload } from 'react-icons/hi';

const resources = [
  {
    title: 'Software Installation Guide',
    filename: 'software.pdf',
    description: 'Step-by-step instructions for installing and configuring essential software tools used in network environments.',
    category: 'Software',
    size: '4.2 MB',
    updated: 'February 28, 2025',
  },
  {
    title: 'IPv6 Migration Checklist',
    filename: 'IPv4-IPv6-Migration-Strategy.pdf',
    description: 'Step-by-step guide to transitioning your infrastructure from IPv4 to IPv6 with minimal disruption.',
    category: 'Technical',
    size: '1.8 MB',
    updated: 'April 15, 2025',
  },
  {
    title: 'ICT Policy Briefs',
    filename: 'NATIONAL-ICT-POLICY-2019.pdf',
    description: 'Analysis of recent regulatory developments in Kenya’s ICT sector with implications for service providers.',
    category: 'Policy',
    size: '3.2 MB',
    updated: 'April 22, 2025',
  },
  {
    title: 'Electrical Grid',
    filename: 'Overview of the Electrical Grid.pdf',
    description: 'Technical manual covering electrical grid layout, design principles, and grid interconnection strategies.',
    category: 'Technical',
    size: '5.1 MB',
    updated: 'April 28, 2025',
  },
  {
    title: 'Cybersecurity Best Practices',
    filename: 'Cybersecurity-Best-Practices.pdf',
    description: 'Key practices to protect network infrastructure against common cyber threats.',
    category: 'Security',
    size: '2.7 MB',
    updated: 'March 30, 2025',
  },
  {
    title: 'Network Security Guide',
    filename: 'Network-security.pdf',
    description: 'A comprehensive guide for implementing robust security measures for network infrastructure and operations.',
    category: 'Security',
    size: '2.4 MB',
    updated: 'May 1, 2025',
  },
  {
    title: 'Peering Guidelines',
    filename: 'peering-guidelines.pdf',
    description: 'Best practices for establishing peering agreements with local and international partners.',
    category: 'Technical',
    size: '1.5 MB',
    updated: 'March 15, 2025',
  },
  {
    title: 'Network Performance Optimization',
    filename: 'Network-Optimization.pdf',
    description: 'Techniques and tools for maximizing network speed and efficiency.',
    category: 'Technical',
    size: '3.8 MB',
    updated: 'February 15, 2025',
  },
];

export default function ResourcesPage() {
  return (
    <section className="min-h-screen py-20 px-6 lg:px-24 bg-gradient-to-br from-gray-50 to-white text-gray-800">
      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-extrabold mb-2 text-teal-700">Resources</h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore technical documentation, policy briefs, and guides curated by Kelvisan Electrical Networks Ltd.
          </p>

          
        </motion.div>

        {/* Featured Resources */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-teal-600">Featured Resources</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {resources.slice(0, 4).map((resource, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <div className="text-xs font-semibold text-teal-500 uppercase mb-2">{resource.category}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href={`/files/${resource.filename}`}
                  download={resource.filename}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium text-teal-800 bg-teal-100 hover:bg-teal-200 transition"
                >
                  <HiOutlineDownload />
                  Download PDF
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Resources Table */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-teal-600">All Resources</h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="table table-zebra text-sm">
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
                      <a
                        href={`/files/${resource.filename}`}
                        download={resource.filename}
                        className="btn btn-xs btn-outline btn-primary flex items-center gap-1"
                      >
                        <HiOutlineDownload />
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-20 bg-yellow-50 rounded-xl p-10 text-center shadow-sm border border-yellow-200"
        >
          <h3 className="text-2xl font-bold text-teal-800 mb-2">Need Additional Resources?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            If you can’t find what you are looking for, feel free to reach out. We are always updating our resource center.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
  <Link href="/contact">
    <button className="btn px-6 py-3 text-base font-semibold rounded-lg border-2 border-teal-600 text-teal-700 bg-white hover:bg-teal-50 hover:shadow-md transition duration-200">
      Contact Us
    </button>
  </Link>
  <Link href="/about">
    <button className="btn px-6 py-3 text-base font-semibold rounded-lg bg-yellow-400 text-teal-900 hover:bg-yellow-300 shadow-sm hover:shadow-md transition duration-200">
      Join Kelvisan
    </button>
  </Link>
</div>
        </motion.div>
      </div>
    </section>
  );
}
