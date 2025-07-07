// app/admin/categories.tsx
"use client"
import React, { useState } from 'react';
import { apiRequest } from '../../lib/api';

// Re-define Category interface here for self-containment
interface Category {
  id?: number;
  name: string;
  description?: string;
  created_at?: Date;
}

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(true); // Initialize to true to show modal first
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category>({ name: '', description: '' });
  const [formError, setFormError] = useState<string | null>(null);

  const [hasAttemptedCategoryFetch, setHasAttemptedCategoryFetch] = useState(false);


  // Function to fetch categories (will now only be called manually)
  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    setHasAttemptedCategoryFetch(true);
    try {
      // CORRECTED ENDPOINT: Changed to '/category'
      const data = await apiRequest<Category[]>('/category');
      setCategories(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteCategory = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this category? This might affect products linked to it.')) {
      setLoading(true);
      setError(null);
      try {
        // CORRECTED ENDPOINT: Changed to '/category'
        await apiRequest(`/category/${id}`, { method: 'DELETE' });
        fetchCategories(); // Re-fetch categories after deletion
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
        // CORRECTED ENDPOINT: Changed to '/category'
        await apiRequest<Category>(`/category/${currentCategory.id}`, {
          method: 'PUT',
          body: JSON.stringify(currentCategory),
        });
      } else {
        // CORRECTED ENDPOINT: Changed to '/category'
        await apiRequest<Category>('/category', {
          method: 'POST',
          body: JSON.stringify(currentCategory),
        });
      }
      setShowModal(false);
      fetchCategories(); // Re-fetch categories to update the list
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Failed to save category.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (!hasAttemptedCategoryFetch || (categories.length === 0 && !loading && !error)) {
      fetchCategories();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Product Categories</h1>
      <button
        onClick={handleAddCategory}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 mb-6"
      >
        Add New Category
      </button>

      {hasAttemptedCategoryFetch ? (
        loading ? (
          <div className="text-center py-8 text-gray-600">Loading categories...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">Error: {error}</div>
        ) : categories.length === 0 ? (
          <p className="text-gray-600">No categories found. Click &quot;Add New Category&quot; to get started!</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{category.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{category.description || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id!)}
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
        <p className="text-gray-600">Start by adding your first category!</p>
      )}


      {/* Category Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {isEditing ? 'Edit Category' : 'Add New Category'}
            </h2>
            {formError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
                {formError}
              </div>
            )}
            <form onSubmit={handleSaveCategory}>
              <div className="mb-4">
                <label htmlFor="categoryName" className="block text-gray-700 text-sm font-bold mb-2">
                  Category Name:
                </label>
                <input
                  type="text"
                  id="categoryName"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  value={currentCategory.name}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="categoryDescription" className="block text-gray-700 text-sm font-bold mb-2">
                  Description (Optional):
                </label>
                <textarea
                  id="categoryDescription"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 h-24 resize-none"
                  value={currentCategory.description || ''}
                  onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                  disabled={loading}
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
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