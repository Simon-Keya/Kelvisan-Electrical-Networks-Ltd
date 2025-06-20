'use client'
import Link from 'next/link';

export interface Product {
  id: number;
  name: string;
  description: string;
  specs: string;
  price: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-md p-4 bg-white">
      <h2 className="font-semibold text-xl mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-2">{product.description}</p>
      <p className="text-sm whitespace-pre-wrap mb-2">{product.specs}</p>
      <p className="font-semibold mb-4">${product.price.toFixed(2)}</p>
      <Link href="/contact" className="btn btn-primary">
        Order Enquiry
      </Link>
    </div>
  );
}
