'use client'
import Link from 'next/link'
import { FaBoxOpen, FaUsers } from 'react-icons/fa'

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-base-200 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-black mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manage Products */}
          <Link href="/admin/products" className="card bg-teal-800 shadow-lg hover:shadow-xl transition duration-300 hover:scale-[1.02] cursor-pointer text-white">
            <div className="card-body items-center text-center">
              <FaBoxOpen className="text-5xl text-yellow-400 mb-3" />
              <h2 className="card-title text-2xl font-semibold">Manage Products</h2>
              <p className="text-sm text-teal-100">Add, update or remove products with ease.</p>
            </div>
          </Link>

          {/* View Newsletter Subscribers */}
          <Link href="/admin/newsletter" className="card bg-teal-800 shadow-lg hover:shadow-xl transition duration-300 hover:scale-[1.02] cursor-pointer text-white">
            <div className="card-body items-center text-center">
              <FaUsers className="text-5xl text-yellow-400 mb-3" />
              <h2 className="card-title text-2xl font-semibold">View Subscribers</h2>
              <p className="text-sm text-teal-100">Check and manage newsletter signups.</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}
