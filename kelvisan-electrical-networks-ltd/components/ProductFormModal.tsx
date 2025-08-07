"use client"
    import React, { useEffect, useState } from 'react';
import { Category, Product } from '../app/interfaces/Product';
import { apiRequest } from '../app/lib/api';

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
        image_url: '',
        description: '',
        price: 0,
        category_id: null,
      });
      const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
      const [formLoading, setFormLoading] = useState(false);
      const [formError, setFormError] = useState<string | null>(null);
      const [modalCategories, setModalCategories] = useState<Category[]>([]);
      const [loadingModalCategories, setLoadingModalCategories] = useState(false);
      const [errorModalCategories, setErrorModalCategories] = useState<string | null>(null);

      useEffect(() => {
        if (show) {
          const fetchModalCategories = async () => {
            setLoadingModalCategories(true);
            setErrorModalCategories(null);
            try {
              const data = await apiRequest<Category[]>('/categories', { isAuthenticatedRequest: false });
              setModalCategories(data);
            } catch (err: unknown) {
              setErrorModalCategories(err instanceof Error ? err.message : 'Failed to load categories for the form.');
            } finally {
              setLoadingModalCategories(false);
            }
          };
          fetchModalCategories();
        }
      }, [show]);

      useEffect(() => {
        if (show) {
          if (initialProductData) {
            setCurrentProduct({
              ...initialProductData,
              price: parseFloat(initialProductData.price.toString()),
            });
          } else {
            setCurrentProduct({ name: '', image_url: '', description: '', price: 0, category_id: null });
          }
          setSelectedImageFile(null);
          setFormError(null);
        }
      }, [show, initialProductData]);

      const handleSaveProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!currentProduct.name.trim() || !currentProduct.description.trim() || (currentProduct.price as number) <= 0) {
          setFormError('Name, description, and a valid price are required.');
          return;
        }

        if (!isEditing && !selectedImageFile) {
          setFormError('Image file is required for new products.');
          return;
        }
        if (isEditing && !selectedImageFile && !currentProduct.image_url) {
          setFormError('Image is required. Please upload a new image or ensure an existing image URL is present.');
          return;
        }

        setFormLoading(true);
        try {
          const formData = new FormData();
          formData.append('name', currentProduct.name);
          formData.append('description', currentProduct.description);
          formData.append('price', (currentProduct.price as number).toString());
          if (currentProduct.category_id != null) {
            formData.append('category_id', currentProduct.category_id);
          }
          if (selectedImageFile) {
            formData.append('image', selectedImageFile);
          } else if (isEditing && currentProduct.image_url) {
            formData.append('image_url', currentProduct.image_url);
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

      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          setSelectedImageFile(e.target.files[0]);
        } else {
          setSelectedImageFile(null);
        }
      };

      if (!show) return null;

      return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8 overflow-y-auto">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full my-8 transform scale-95 animate-scale-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
                {formError}
              </div>
            )}
            {loadingModalCategories ? (
              <div className="text-center py-4 text-gray-600">Loading categories for dropdown...</div>
            ) : errorModalCategories ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
                Error: {errorModalCategories}
              </div>
            ) : (
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
                    required={!isEditing || !currentProduct.image_url}
                    disabled={formLoading}
                    accept="image/*"
                  />
                  {isEditing && currentProduct.image_url && !selectedImageFile && (
                    <p className="text-sm text-gray-500 mt-1">Current image: <a href={currentProduct.image_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Image</a></p>
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
                    Price (Ksh):
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute left-0 pl-3 text-gray-500">Ksh</span>
                    <input
                      type="text"
                      id="productPrice"
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pl-12"
                      value={currentProduct.price.toString()}
                      onChange={(e) => {
                        const rawValue = e.target.value;
                        const numericValue = rawValue.replace(/[^0-9.]/g, '');
                        const parts = numericValue.split('.');
                        if (parts.length > 2) {
                          parts.pop();
                        }
                        const finalValue = parts.join('.');
                        setCurrentProduct({ ...currentProduct, price: parseFloat(finalValue) || 0 });
                      }}
                      required
                      pattern="[0-9]+(\.[0-9]{1,2})?"
                      inputMode="decimal"
                      disabled={formLoading}
                      placeholder="e.g., 499.99"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="productCategory" className="block text-gray-700 text-sm font-bold mb-2">
                    Category:
                  </label>
                  <select
                    id="productCategory"
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                    value={currentProduct.category_id ?? ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, category_id: e.target.value || null })}
                    disabled={formLoading || loadingModalCategories}
                  >
                    <option value="">-- Select a Category --</option>
                    {modalCategories.map((cat) => (
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
            )}
          </div>
        </div>
      );
    };

    export default ProductFormModal;