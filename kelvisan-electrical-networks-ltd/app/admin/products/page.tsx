// app/admin/products.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../lib/api';

// Re-define Product interface here for self-containment
interface Product {
  id?: number;
  name: string;
  image: string; // This will store the URL after upload
  description: string;
  price: number;
  category_id?: number | null;
  category_name?: string | null; // For display
  created_at?: Date;
}

// Re-define Category interface here for self-containment (needed for dropdown)
interface Category {
  id: number;
  name: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: '',
    image: '', // Will be a URL
    description: '',
    price: 0,
    category_id: null,
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null); // New state for file upload
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsData, categoriesData] = await Promise.all([
        apiRequest<Product[]>('/products'),
        apiRequest<Category[]>('/categories'),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (err: unknown) { // Changed 'any' to 'unknown'
      setError(err instanceof Error ? err.message : 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setIsEditing(false);
    setCurrentProduct({ name: '', image: '', description: '', price: 0, category_id: null });
    setSelectedImageFile(null); // Clear selected file
    setFormError(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct(product);
    setSelectedImageFile(null); // Clear selected file, user might upload new one
    setFormError(null);
    setShowModal(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setLoading(true);
      setError(null);
      try {
        await apiRequest(`/products/${id}`, { method: 'DELETE' });
        fetchData(); // Re-fetch all data after deletion
      } catch (err: unknown) { // Changed 'any' to 'unknown'
        setError(err instanceof Error ? err.message : 'Failed to delete product.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic validation
    if (!currentProduct.name.trim() || !currentProduct.description.trim() || currentProduct.price <= 0) {
      setFormError('Name, description, and a valid price are required.');
      return;
    }

    // For new product or if a new file is selected for update, require a file
    if (!isEditing && !selectedImageFile) {
        setFormError('Image file is required for new products.');
        return;
    }
    // If editing and no new file selected, ensure existing image URL is present
    if (isEditing && !selectedImageFile && !currentProduct.image) {
        setFormError('Image is required. Please upload a new image or ensure an existing image URL is present.');
        return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', currentProduct.name);
      formData.append('description', currentProduct.description);
      formData.append('price', currentProduct.price.toString());
      if (currentProduct.category_id != null) {
        formData.append('category_id', currentProduct.category_id.toString());
      }

      if (selectedImageFile) {
        formData.append('image', selectedImageFile); // Append the file
      } else if (isEditing && currentProduct.image) {
        // If editing and no new file, but there's an existing image URL, send it
        // Your backend should handle receiving either a file or a URL for updates
        formData.append('image_url', currentProduct.image); // Send as a separate field if backend expects it
      }


      if (isEditing && currentProduct.id) {
        await apiRequest<Product>(`/products/${currentProduct.id}`, {
          method: 'PUT',
          body: formData,
          // IMPORTANT: Do NOT set 'Content-Type': 'multipart/form-form-data'.
          // The browser sets it automatically with the correct boundary when FormData is used.
          headers: {
            // 'Content-Type': 'multipart/form-data' // REMOVE THIS LINE
          }
        });
      } else {
        await apiRequest<Product>('/products', {
          method: 'POST',
          body: formData,
          // IMPORTANT: Do NOT set 'Content-Type': 'multipart/form-data'.
          // The browser sets it automatically with the correct boundary when FormData is used.
          headers: {
            // 'Content-Type': 'multipart/form-data' // REMOVE THIS LINE
          }
        });
      }
      setShowModal(false);
      fetchData(); // Re-fetch all data to update the list
    } catch (err: unknown) { // Changed 'any' to 'unknown'
      setFormError(err instanceof Error ? err.message : 'Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImageFile(e.target.files[0]);
      // Optionally, set a preview URL for the image
      // setCurrentProduct({ ...currentProduct, image: URL.createObjectURL(e.target.files[0]) });
    } else {
      setSelectedImageFile(null);
    }
  };

  if (loading) return <div className="text-center py-8">Loading products and categories...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Products Management</h1>
      <button
        onClick={handleAddProduct}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 mb-6"
      >
        Add New Product
      </button>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found. Add one to get started!</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category_name || 'Uncategorized'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id!)}
                      className="text-red-600 hover:text-red-900 transition duration-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Product Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
                {formError}
              </div>
            )}
            <form onSubmit={handleSaveProduct}>
              <div className="mb-4">
                <label htmlFor="productName" className="block text-gray-700 text-sm font-bold mb-2">
                  Product Name:
                </label>
                <input
                  type="text"
                  id="productName"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="productImage" className="block text-gray-700 text-sm font-bold mb-2">
                  Product Image:
                </label>
                <input
                  type="file" // Changed to file input
                  id="productImage"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  onChange={handleImageChange} // New handler for file input
                  // `required` attribute should be conditional based on `isEditing` and `currentProduct.image`
                  // For new products, it's required. For edits, it's optional if an image already exists.
                  required={!isEditing || !currentProduct.image}
                  disabled={loading}
                  accept="image/*" // Restrict to image files
                />
                {isEditing && currentProduct.image && !selectedImageFile && (
                    <p className="text-sm text-gray-500 mt-1">Current image: <a href={currentProduct.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Image</a></p>
                )}
                {selectedImageFile && (
                    <p className="text-sm text-gray-500 mt-1">Selected new image: {selectedImageFile.name}</p>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="productDescription" className="block text-gray-700 text-sm font-bold mb-2">
                  Description:
                </label>
                <textarea
                  id="productDescription"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-24 resize-none"
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  required
                  disabled={loading}
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="productPrice" className="block text-gray-700 text-sm font-bold mb-2">
                  Price:
                </label>
                <input
                  type="number"
                  id="productPrice"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) || 0 })}
                  required
                  min="0.01"
                  step="0.01"
                  disabled={loading}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="productCategory" className="block text-gray-700 text-sm font-bold mb-2">
                  Category:
                </label>
                <select
                  id="productCategory"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  value={currentProduct.category_id || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category_id: e.target.value ? parseInt(e.target.value) : null })}
                  disabled={loading}
                >
                  <option value="">-- Select a Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
