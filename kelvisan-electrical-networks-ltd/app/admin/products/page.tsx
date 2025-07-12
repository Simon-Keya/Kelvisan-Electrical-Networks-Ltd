// app/admin/products/page.tsx
"use client" // This component uses client-side hooks like useState, etc.
import Image from 'next/image'; // Import Next.js Image component for optimization
import React, { useEffect, useState } from 'react';
import ProductFormModal from '../../../components/ProductFormModal'; // Import the modal component
import { Product } from '../../interfaces/Product'; // <--- IMPORT SHARED PRODUCT INTERFACE
import { apiRequest } from '../../lib/api'; // Utility for making API calls

const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // State to control the visibility and mode of the ProductFormModal
  const [showProductModal, setShowProductModal] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false); // Default to adding new product
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined); // No product selected for edit initially

  // States for managing the product list display (loading, error, content)
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [errorProducts, setErrorProducts] = useState<string | null>(null);

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    setLoadingProducts(true);
    setErrorProducts(null);
    try {
      const data = await apiRequest<Product[]>('/products');
      // CRUCIAL FIX: Parse price to a number after fetching
      // Map over the data to ensure 'price' is a number for frontend operations (like toFixed)
      const parsedProducts = data.map(product => ({
        ...product,
        // Use String() constructor to explicitly convert product.price to a string.
        // This satisfies the linter by making the type conversion explicit.
        price: parseFloat(String(product.price)),
      }));
      setProducts(parsedProducts);
    } catch (err: unknown) {
      setErrorProducts(err instanceof Error ? err.message : 'Failed to fetch products.');
    } finally {
      setLoadingProducts(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

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
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">Products Management</h1>
      <button
        onClick={handleAddProduct}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 mb-8"
      >
        Add New Product
      </button>

      {loadingProducts ? (
        <div className="text-center py-12 text-gray-600 text-lg">Loading products...</div>
      ) : errorProducts ? (
        <div className="text-center py-12 text-red-600 text-lg font-semibold">Error loading products: {errorProducts}</div>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No products found. Click &quot;Add New Product&quot; to get started!</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Image</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.id}</td>
                  <td className="px-6 py-4">
                    {product.image ? (
                      <Image // Use Next.js Image component
                        src={product.image}
                        alt={product.name}
                        width={64} // Corresponds to w-16 (16*4=64px)
                        height={64} // Corresponds to h-16 (16*4=64px)
                        className="object-cover rounded-md shadow-sm"
                        onError={(e) => {
                          console.error('Image loading error:', e.currentTarget.src);
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs">No Image</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{product.category_name || 'Uncategorized'}</td>
                  {/* Ensure product.price is a number before calling toFixed */}
                  <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">${(product.price as number || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-200 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id!)}
                      className="text-red-600 hover:text-red-900 transition duration-200 hover:underline"
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

      {/* Product Add/Edit Modal Component */}
      <ProductFormModal
        show={showProductModal}
        onClose={handleCloseModal}
        onProductSaved={handleProductSaved}
        isEditing={isEditingProduct}
        initialProductData={productToEdit}
      />
    </div>
  );
};

export default AdminProductsPage;