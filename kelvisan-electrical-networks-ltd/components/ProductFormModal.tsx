// components/ProductFormModal.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { apiRequest } from '../app/lib/api'; // Still needed for product save/update

// Re-define Product interface
interface Product {
  id?: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category_id?: number | null;
  category_name?: string | null;
  created_at?: Date;
}

// Re-define Category interface
interface Category {
  id: number;
  name: string;
}

interface ProductFormModalProps {
  show: boolean;
  onClose: () => void;
  onProductSaved: () => void;
  isEditing: boolean;
  initialProductData?: Product;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  show,
  onClose,
  onProductSaved,
  isEditing,
  initialProductData,
}) => {
  const [currentProduct, setCurrentProduct] = useState<Product>({
    name: '',
    image: '',
    description: '',
    price: 0,
    category_id: null,
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Hardcoded categories for now, as requested.
  // These will be available in the dropdown without any API calls.
  const categories: Category[] = [
    { id: 1, name: 'Energy' },
    { id: 2, name: 'Technology' },
  ];

  // Removed all state and useEffect related to fetching categories (loadingModalCategories, errorModalCategories).

  // Effect to update form fields when initialProductData changes
  useEffect(() => {
    if (show) {
      setCurrentProduct(initialProductData || { name: '', image: '', description: '', price: 0, category_id: null });
      setSelectedImageFile(null);
      setFormError(null);
    }
  }, [show, initialProductData]);

  // Handler for saving (creating or updating) a product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic client-side validation
    if (!currentProduct.name.trim() || !currentProduct.description.trim() || currentProduct.price <= 0) {
      setFormError('Name, description, and a valid price are required.');
      return;
    }

    // Image validation logic:
    if (!isEditing && !selectedImageFile) {
      setFormError('Image file is required for new products.');
      return;
    }
    if (isEditing && !selectedImageFile && !currentProduct.image) {
      setFormError('Image is required. Please upload a new image or ensure an existing image URL is present.');
      return;
    }

    setFormLoading(true);
    try {
      const formData = new FormData();

      formData.append('name', currentProduct.name);
      formData.append('description', currentProduct.description);
      formData.append('price', currentProduct.price.toString());

      if (currentProduct.category_id != null) {
        formData.append('category_id', currentProduct.category_id.toString());
      }

      if (selectedImageFile) {
        formData.append('image', selectedImageFile);
      } else if (isEditing && currentProduct.image) {
        formData.append('image_url', currentProduct.image);
      }

      if (isEditing && currentProduct.id) {
        await apiRequest<Product>(`/products/${currentProduct.id}`, {
          method: 'PUT',
          body: formData,
        });
      } else {
        await apiRequest<Product>('/products', {
          method: 'POST',
          body: formData,
        });
      }

      onProductSaved();
      onClose();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Failed to save product.');
    } finally {
      setFormLoading(false);
    }
  };

  // Handler for when a file is selected in the image input
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImageFile(e.target.files[0]);
    } else {
      setSelectedImageFile(null);
    }
  };

  if (!show) return null;

  return (
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
        {/* No more loading/error messages for categories here */}
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
              disabled={formLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productImage" className="block text-gray-700 text-sm font-bold mb-2">
              Product Image:
            </label>
            <input
              type="file"
              id="productImage"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              onChange={handleImageChange}
              required={!isEditing || !currentProduct.image}
              disabled={formLoading}
              accept="image/*"
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
              disabled={formLoading}
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
              disabled={formLoading}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="productCategory" className="block text-gray-700 text-sm font-bold mb-2">
              Category:
            </label>
            <select
              id="productCategory"
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={currentProduct.category_id ?? ''}
              onChange={(e) => setCurrentProduct({ ...currentProduct, category_id: e.target.value ? parseInt(e.target.value) : null })}
              disabled={formLoading}
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
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300"
              disabled={formLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={formLoading}
            >
              {formLoading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;