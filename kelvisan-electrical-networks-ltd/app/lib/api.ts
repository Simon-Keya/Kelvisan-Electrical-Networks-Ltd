// lib/api.ts
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api'; // Update for production

// Create an Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // ⬅️ Important for sending cookies (e.g. JWT in HTTP-only cookie)
});

// ------------------ Products API ------------------

// Fetch all products
export async function fetchProducts() {
  const { data } = await api.get('/products');
  return data;
}

// Upload product with image (multipart/form-data)
export async function uploadProductWithImage(formData: FormData) {
  const { data } = await api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

// Create product without image
export async function createProduct(product: {
  name: string;
  image: string;
  description: string;
  price: number;
}) {
  const { data } = await api.post('/products', product);
  return data;
}

// Update a product
export async function updateProduct(
  id: number,
  product: Partial<{ name: string; image: string; description: string; price: number }>
) {
  const { data } = await api.put(`/products/${id}`, product);
  return data;
}

// Delete a product
export async function deleteProduct(id: number) {
  const { data } = await api.delete(`/products/${id}`);
  return data;
}

// ------------------ Newsletter API ------------------

// Fetch newsletter subscribers
export async function fetchSubscribers() {
  const { data } = await api.get('/newsletter');
  return data;
}

// ------------------ Auth API ------------------

export async function loginAdmin(email: string, password: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      { email, password },
      { withCredentials: true } // Important for HTTP-only cookies
    );

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Login error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data?.message || 'Login failed' };
  }
}
