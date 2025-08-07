"use client"
    import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ProductFormModal from '../../../components/ProductFormModal';
import { Product } from '../../interfaces/Product';
import { apiRequest } from '../../lib/api';

    const AdminProductsPage: React.FC = () => {
      const [products, setProducts] = useState<Product[]>([]);
      const [showProductModal, setShowProductModal] = useState(false);
      const [isEditingProduct, setIsEditingProduct] = useState(false);
      const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
      const [loadingProducts, setLoadingProducts] = useState(false);
      const [errorProducts, setErrorProducts] = useState<string | null>(null);

      const fetchProducts = async () => {
        setLoadingProducts(true);
        setErrorProducts(null);
        try {
          const data = await apiRequest<Product[]>('/products');
          const parsedProducts = data.map(product => ({
            ...product,
            price: parseFloat(String(product.price)),
          }));
          setProducts(parsedProducts);
        } catch (err: unknown) {
          setErrorProducts(err instanceof Error ? err.message : 'Failed to fetch products.');
        } finally {
          setLoadingProducts(false);
        }
      };

      useEffect(() => {
        fetchProducts();
      }, []);

      const handleAddProduct = () => {
        setIsEditingProduct(false);
        setProductToEdit(undefined);
        setShowProductModal(true);
      };

      const handleEditProduct = (product: Product) => {
        setIsEditingProduct(true);
        setProductToEdit(product);
        setShowProductModal(true);
      };

      const handleDeleteProduct = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
          setLoadingProducts(true);
          setErrorProducts(null);
          try {
            await apiRequest(`/products/${id}`, { method: 'DELETE' });
            fetchProducts();
          } catch (err: unknown) {
            setErrorProducts(err instanceof Error ? err.message : 'Failed to delete product.');
          } finally {
            setLoadingProducts(false);
          }
        }
      };

      const handleProductSaved = () => {
        fetchProducts();
        setShowProductModal(false);
      };

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
                        {product.image_url ? (
                          <Image
                            src={product.image_url}
                            alt={product.name}
                            width={64}
                            height={64}
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
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-700">Ksh.{(product.price as number || 0).toFixed(2)}</td>
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