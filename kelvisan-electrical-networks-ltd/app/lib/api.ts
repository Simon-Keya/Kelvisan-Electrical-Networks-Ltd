// lib/api.ts
// This file provides a utility for making authenticated API requests to the backend.

import { getAuthToken, removeAuthToken } from './auth';

// Define your backend API base URL
// IMPORTANT: This now includes '/api' to match your backend's app.use('/api', ...) setup.
const API_BASE_URL = 'https://kelvisan-backend.onrender.com/api';

/**
 * Makes an authenticated API request to the backend.
 * Automatically adds the Authorization header if a token is available.
 * Handles common errors like 401 Unauthorized.
 * @param endpoint The specific API endpoint (e.g., '/products', '/auth/login').
 * Do NOT include '/api' prefix here, as it's part of API_BASE_URL.
 * @param options Fetch API options (method, headers, body, etc.).
 * @returns A Promise that resolves to the JSON response.
 * @throws An Error if the request fails or returns a non-OK status.
 */
export const apiRequest = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const token = getAuthToken();

  // Initialize headers as a mutable object (Record<string, string>)
  const headers: Record<string, string> = {};

  // If the request body is JSON, set Content-Type
  // If it's FormData, the browser will set the correct Content-Type automatically.
  if (!(options?.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Merge any provided headers from options
  if (options?.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, options.headers);
    }
  }

  // Add Authorization header if a token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers, // Pass the constructed headers object
  });

  if (!response.ok) {
    // Handle specific error codes
    if (response.status === 401) {
      // If 401, token might be invalid or expired. Log out the user.
      removeAuthToken();
      // Redirect to login page or show a message
      window.location.href = '/admin/login'; // Example redirect
      throw new Error('Unauthorized: Please log in again.');
    }

    // Try to parse error message from response body
    let errorDetail = response.statusText;
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorDetail = errorData.message;
      }
    } catch (err: unknown) { // Use 'unknown' for type safety
      console.warn('Failed to parse error response as JSON:', err instanceof Error ? err.message : err);
    }
    throw new Error(`API request failed: ${response.status} - ${errorDetail}`);
  }

  // Handle cases where the response might be empty (e.g., DELETE requests)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else {
    // Return an empty object or a success message if no JSON content
    return {} as T;
  }
};
