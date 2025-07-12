// components/ProductFormModal.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { Category, Product } from '../app/interfaces/Product'; // IMPORT SHARED INTERFACES
import { apiRequest } from '../app/lib/api'; // Assuming api.ts is in lib/ (path relative to components folder)

interface ProductFormModalProps {
  show: boolean; // Controls visibility of the modal
  onClose: () => void; // Callback to close the modal
  onProductSaved: () => void; // Callback when a product is successfully saved
  isEditing: boolean; // True if editing, false if adding new
  initialProductData?: Product; // Data for product being edited
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
    price: 0, // Internal state for price should be a number
    category_id: null,
  });
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [formLoading, setFormLoading] = useState(false); // Loading state for the form itself
  const [formError, setFormError] = useState<string | null>(null); // Errors specific to the form submission

  // States for categories within the modal (fetched when modal is shown)
  const [modalCategories, setModalCategories] = useState<Category[]>([]);
  const [loadingModalCategories, setLoadingModalCategories] = useState(false);
  const [errorModalCategories, setErrorModalCategories] = useState<string | null>(null);

  // Effect to fetch categories only when the modal becomes visible
  useEffect(() => {
    if (show) {
      const fetchModalCategories = async () => {
        setLoadingModalCategories(true);
        setErrorModalCategories(null);
        try {
          // Assuming /category endpoint does not require authentication
          const data = await apiRequest<Category[]>('/category', { isAuthenticatedRequest: false });
          setModalCategories(data); // Set to modal-specific categories state
        } catch (err: unknown) {
          setErrorModalCategories(err instanceof Error ? err.message : 'Failed to load categories for the form.');
        } finally {
          setLoadingModalCategories(false);
        }
      };
      fetchModalCategories();
    }
  }, [show]); // Run when 'show' prop changes

  // Effect to update form fields when initialProductData changes (e.g., when editing a different product)
  useEffect(() => {
    if (show) { // Only update when modal is shown to prevent re-rendering issues
      if (initialProductData) {
        // Parse price to number when setting initial data
        setCurrentProduct({
          ...initialProductData,
          price: parseFloat(initialProductData.price.toString()), // Ensure price is a number for form input
        });
      } else {
        setCurrentProduct({ name: '', image: '', description: '', price: 0, category_id: null });
      }
      setSelectedImageFile(null); // Clear selected file when opening for edit/add
      setFormError(null); // Clear form errors
    }
  }, [show, initialProductData]);

  // Handler for saving (creating or updating) a product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Basic client-side validation
    // Cast currentProduct.price to number for comparison
    if (!currentProduct.name.trim() || !currentProduct.description.trim() || (currentProduct.price as number) <= 0) {
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

    setFormLoading(true); // Set loading state for the form submission
    try {
      const formData = new FormData();

      formData.append('name', currentProduct.name);
      formData.append('description', currentProduct.description);
      // Ensure price is sent as a string for FormData
      formData.append('price', (currentProduct.price as number).toString());

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

      onProductSaved(); // Notify parent that product was saved
      onClose(); // Close the modal
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

  if (!show) return null; // Don't render anything if modal is not visible

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8 overflow-y-auto"> {/* Added responsive padding and overflow-y-auto */}
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full my-8 transform scale-95 animate-scale-in"> {/* Added my-8 for vertical margin */}
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
                Price (Ksh):
              </label>
              <div className="relative flex items-center"> {/* Use flex to align currency and input */}
                <span className="absolute left-0 pl-3 text-gray-500">Ksh</span> {/* Currency prefix */}
                <input
                  type="text" // Changed to text to remove arrows
                  id="productPrice"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 pl-12" // Increased left padding for currency
                  value={currentProduct.price.toString()} // Ensure value is a string for text input
                  onChange={(e) => {
                    // Allow only numbers and a single decimal point
                    const rawValue = e.target.value;
                    const numericValue = rawValue.replace(/[^0-9.]/g, ''); // Remove non-numeric except dot
                    const parts = numericValue.split('.');
                    if (parts.length > 2) { // Allow only one decimal point
                      parts.pop();
                    }
                    const finalValue = parts.join('.');

                    setCurrentProduct({ ...currentProduct, price: parseFloat(finalValue) || 0 });
                  }}
                  required
                  pattern="[0-9]+(\.[0-9]{1,2})?" // Basic pattern for numeric input with 0-2 decimal places
                  inputMode="decimal" // Suggests numeric keyboard on mobile
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
                onChange={(e) => setCurrentProduct({ ...currentProduct, category_id: e.target.value ? parseInt(e.target.value) : null })}
                disabled={formLoading || loadingModalCategories}
              >
                <option value="">-- Select a Category --</option>
                {modalCategories.map((cat) => ( // Use modalCategories here
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
