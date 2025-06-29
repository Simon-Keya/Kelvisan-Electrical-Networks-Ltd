'use client';

import { useEffect, useState } from 'react';
import {
  fetchProducts as getAllProducts,
  uploadProductWithImage,
} from '../../lib/api';

type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('image', imageFile);

    try {
      await uploadProductWithImage(formData);
      setForm({ name: '', description: '', price: '' });
      setImageFile(null);
      fetchProducts();
    } catch (err) {
      console.error('Error uploading product:', err);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          🛒 Product Management
        </h1>
        <p className="text-gray-600">Upload and manage your store products.</p>
      </section>

      {/* Add Product Form */}
      <section className="bg-white shadow-lg rounded-xl p-8 mb-12 border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add New Product
        </h2>
        <form
          onSubmit={addProduct}
          className="grid md:grid-cols-2 gap-6"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="productName"
              className="label-text font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              id="productName"
              name="productName"
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. LED Bulb"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label
              htmlFor="productImage"
              className="label-text font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              id="productImage"
              name="productImage"
              type="file"
              accept="image/*"
              onChange={e => setImageFile(e.target.files?.[0] || null)}
              required
              className="file-input file-input-bordered w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="description"
              className="label-text font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Enter product description"
              required
              className="textarea textarea-bordered w-full"
              rows={3}
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="label-text font-medium text-gray-700"
            >
              Price (Ksh)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              placeholder="e.g. 1500.00"
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-end">
            <button type="submit" className="btn btn-primary w-full">
              ➕ Add Product
            </button>
          </div>
        </form>
      </section>

      {/* Product List */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          📦 All Products
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map(product => (
            <div
              key={product.id}
              className="flex gap-4 bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 object-cover rounded-md border"
              />
              <div>
                <h3 className="text-lg font-bold text-blue-800">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {product.description}
                </p>
                <span className="font-semibold text-green-600">
                  Ksh {product.price.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No products added yet.
          </p>
        )}
      </section>
    </main>
  );
}
