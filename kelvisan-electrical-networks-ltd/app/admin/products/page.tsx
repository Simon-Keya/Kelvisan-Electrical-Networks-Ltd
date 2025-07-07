// app/admin/products/page.tsx
"use client" // This component uses client-side hooks like useState, etc.
import React, { useState } from 'react'; // Removed useEffect as initial fetches are no longer here
import ProductFormModal from '../../../components/ProductFormModal'; // Import the modal component
import { apiRequest } from '../../lib/api'; // Utility for making API calls

// Re-define Product interface for self-containment and clarity
interface Product {
  id?: number; // Optional as it might not exist when creating a new product
  name: string;
  image: string; // This will store the URL of the uploaded image
  description: string;
  price: number;
  category_id?: number | null; // Optional, can be null if uncategorized
  category_name?: string | null; // For display purposes, typically joined from backend
  created_at?: Date; // Optional, read-only from backend
}

// Category interface is no longer needed directly in this file's state
// interface Category {
//   id: number;
//   name: string;
// }

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  // Removed 'categories' state and 'setCategories' as they are now handled by ProductFormModal internally.

  // State to control the visibility and mode of the ProductFormModal
  const [showProductModal, setShowProductModal] = useState(true); // Initialize to true to show modal first
  const [isEditingProduct, setIsEditingProduct] = useState(false); // Default to adding new product
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined); // No product selected for edit initially

  // States for managing the product list display (loading, error, content)
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);
  // This flag ensures the product list is only fetched/displayed after initial modal interaction
  const [hasAttemptedProductFetch, setHasAttemptedProductFetch] = useState(false);

  // Function to fetch products from the backend
  // This is called after a product is saved, deleted, or when the initial modal is closed.
  const fetchProducts = async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    setHasAttemptedProductFetch(true); // Mark that we are now attempting to fetch products
    try {
      const data = await apiRequest<Product[]>('/products');
      setProducts(data);
    } catch (err: unknown) {
      setErrorProducts(err instanceof Error ? err.message : 'Failed to fetch products.');
    } finally {
      setLoadingProducts(false);
    }
  };

  // Handler for opening the "Add New Product" modal
  const handleAddProduct = () => {
    setIsEditingProduct(false); // Set mode to add new
    setProductToEdit(undefined); // Clear any previous product data
    setShowProductModal(true); // Show the modal
  };

  // Handler for opening the "Edit Product" modal
  const handleEditProduct = (product: Product) => {
    setIsEditingProduct(true); // Set mode to edit
    setProductToEdit(product); // Set the product data to be edited
    setShowProductModal(true); // Show the modal
  };

  // Handler for deleting a product
  const handleDeleteProduct = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setLoadingProducts(true); // Show loading for product list operation
      setErrorProducts(null);
      try {
        await apiRequest(`/products/${id}`, { method: 'DELETE' });
        fetchProducts(); // Re-fetch the updated product list
      } catch (err: unknown) {
        setErrorProducts(err instanceof Error ? err.message : 'Failed to delete product.');
      } finally {
        setLoadingProducts(false);
      }
    }
  };

  // Callback function for when a product is successfully saved (from the modal)
  const handleProductSaved = () => {
    fetchProducts(); // Trigger a fetch to update the product list
    setShowProductModal(false); // Close the modal
  };

  // Handler for closing the modal (either by cancel button or successful save)
  const handleCloseModal = () => {
    setShowProductModal(false);
    // If the modal was closed and we haven't fetched products yet, or if the list is empty,
    // trigger a fetch now to display the (potentially empty) list.
    if (!hasAttemptedProductFetch || (products.length === 0 && !loadingProducts && !errorProducts)) {
      fetchProducts();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Products Management</h1>
      <button
        onClick={handleAddProduct}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 mb-6"
      >
        Add New Product
      </button>

      {/* Conditional rendering for the product list table */}
      {hasAttemptedProductFetch ? ( // Only show product list UI if a fetch has been attempted
        loadingProducts ? (
          <div className="text-center py-8 text-gray-600">Loading products...</div>
        ) : errorProducts ? (
          <div className="text-center py-8 text-red-600">Error loading products: {errorProducts}</div>
        ) : products.length === 0 ? (
          <p className="text-gray-600">No products found. Click &quot;Add New Product&quot; to get started!</p>
        ) : (
          // Products Table
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
        )
      ) : (
        // Initial state before any product fetch attempt, prompts user to add
        <p className="text-gray-600">Start by adding your first product!</p>
      )}


      {/* Product Add/Edit Modal Component */}
      <ProductFormModal
        show={showProductModal}
        onClose={handleCloseModal} // Uses the handler to control modal visibility and trigger product fetch
        onProductSaved={handleProductSaved} // Callback for successful save
        isEditing={isEditingProduct}
        initialProductData={productToEdit}
        // The 'categories' prop is explicitly removed as ProductFormModal now fetches its own.
        // This resolves the TypeScript error: "Property 'categories' does not exist on type 'IntrinsicAttributes & ProductFormModalProps'."
      />
    </div>
  );
};

export default AdminProductsPage;