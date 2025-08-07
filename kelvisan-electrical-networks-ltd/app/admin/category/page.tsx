"use client"
    import React, { useEffect, useState } from 'react';
import { apiRequest } from '../../lib/api';

    interface Category {
      id?: string; // Changed to string to match backend UUID
      name: string;
      description?: string;
      created_at?: Date;
    }

    const CategoriesPage: React.FC = () => {
      const [categories, setCategories] = useState<Category[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);
      const [showModal, setShowModal] = useState(false);
      const [isEditing, setIsEditing] = useState(false);
      const [currentCategory, setCurrentCategory] = useState<Category>({ name: '', description: '' });
      const [formError, setFormError] = useState<string | null>(null);

      const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await apiRequest<Category[]>('/categories'); // Changed to /categories
          setCategories(data);
        } catch (err: unknown) {
          setError(err instanceof Error ? err.message : 'Failed to fetch categories.');
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchCategories();
      }, []);

      const handleAddCategory = () => {
        setIsEditing(false);
        setCurrentCategory({ name: '', description: '' });
        setFormError(null);
        setShowModal(true);
      };

      const handleEditCategory = (category: Category) => {
        setIsEditing(true);
        setCurrentCategory(category);
        setFormError(null);
        setShowModal(true);
      };

      const handleDeleteCategory = async (id: string) => { // Changed to string
        if (window.confirm('Are you sure you want to delete this category? This might affect products linked to it.')) {
          setLoading(true);
          setError(null);
          try {
            await apiRequest(`/categories/${id}`, { method: 'DELETE' }); // Changed to /categories
            fetchCategories();
          } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to delete category.');
          } finally {
            setLoading(false);
          }
        }
      };

      const handleSaveCategory = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!currentCategory.name.trim()) {
          setFormError('Category name cannot be empty.');
          return;
        }

        setLoading(true);
        try {
          if (isEditing && currentCategory.id) {
            await apiRequest<Category>(`/categories/${currentCategory.id}`, { // Changed to /categories
              method: 'PUT',
              body: JSON.stringify(currentCategory),
            });
          } else {
            await apiRequest<Category>('/categories', { // Changed to /categories
              method: 'POST',
              body: JSON.stringify(currentCategory),
            });
          }
          setShowModal(false);
          fetchCategories();
        } catch (err: unknown) {
          setFormError(err instanceof Error ? err.message : 'Failed to save category.');
        } finally {
          setLoading(false);
        }
      };

      const handleCloseModal = () => {
        setShowModal(false);
      };

      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 text-center tracking-tight">Product Categories</h1>
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105 mb-8"
          >
            Add New Category
          </button>

          {loading ? (
            <div className="text-center py-12 text-gray-600 text-lg">Loading categories...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-600 text-lg font-semibold">Error: {error}</div>
          ) : categories.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">No categories found. Click &quot;Add New Category&quot; to get started!</p>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-800">{category.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{category.description || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.created_at ? new Date(category.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-200 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id!)}
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

          {showModal && (
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
              <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform scale-95 animate-scale-in">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  {isEditing ? 'Edit Category' : 'Add New Category'}
                </h2>
                {formError && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm" role="alert">
                    {formError}
                  </div>
                )}
                <form onSubmit={handleSaveCategory}>
                  <div className="mb-4">
                    <label htmlFor="categoryName" className="block text-gray-700 text-sm font-semibold mb-2">
                      Category Name:
                    </label>
                    <input
                      type="text"
                      id="categoryName"
                      className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      value={currentCategory.name}
                      onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                      required
                      disabled={loading}
                      placeholder="e.g., Solar Panels"
                    />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="categoryDescription" className="block text-gray-700 text-sm font-semibold mb-2">
                      Description (Optional):
                    </label>
                    <textarea
                      id="categoryDescription"
                      className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-28 resize-none placeholder-gray-400"
                      value={currentCategory.description || ''}
                      onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                      disabled={loading}
                      placeholder="A brief description of this category..."
                    ></textarea>
                  </div>
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-5 rounded-lg transition duration-300 transform hover:scale-105"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                      disabled={loading}
                    >
                      {loading ? 'Saving...' : 'Save Category'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      );
    };

    export default CategoriesPage;