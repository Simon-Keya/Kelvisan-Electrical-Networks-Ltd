'use client';

import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: '', image: '', description: '', price: '' });

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        image: form.image,
        description: form.description,
        price: parseFloat(form.price),
      }),
    });

    if (res.ok) {
      setForm({ name: '', image: '', description: '', price: '' });
      fetchProducts();
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>

      <form onSubmit={addProduct} className="grid gap-4 mb-10 bg-white p-6 rounded shadow">
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          required
          className="input input-bordered"
        />
        <input
          value={form.image}
          onChange={e => setForm({ ...form, image: e.target.value })}
          placeholder="Image URL"
          required
          className="input input-bordered"
        />
        <textarea
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          required
          className="textarea textarea-bordered"
        />
        <input
          type="number"
          step="0.01"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          placeholder="Price"
          required
          className="input input-bordered"
        />
        <button type="submit" className="btn btn-primary w-full">Add Product</button>
      </form>

      <ul className="space-y-6">
        {products.map(product => (
          <li key={product.id} className="p-4 border rounded shadow bg-white flex gap-4">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
            <div>
              <h3 className="font-semibold text-lg">
                {product.name} — ${product.price.toFixed(2)}
              </h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
