// lib/api.ts
// This file provides a utility for making authenticated API requests to the backend.

import { getAuthToken, removeAuthToken } from './auth';

// Define your backend API base URL
// IMPORTANT: This now includes '/api' to match your backend's app.use('/api', ...) setup.
const API_BASE_URL = 'https://kelvisan-backend.onrender.com/api';

// Define a custom RequestOptions interface that extends RequestInit
// to include our custom 'isAuthenticatedRequest' flag.
interface RequestOptions extends RequestInit {
  isAuthenticatedRequest?: boolean; // Set to false for public endpoints
}

/**
 * Makes an API request to the backend.
 * Automatically adds the Authorization header if a token is available AND
 * `isAuthenticatedRequest` is not explicitly set to `false`.
 * Handles common errors like 401 Unauthorized.
 * @param endpoint The specific API endpoint (e.g., '/products', '/auth/login').
 * Do NOT include '/api' prefix here, as it's part of API_BASE_URL.
 * @param options Fetch API options (method, headers, body, etc.), including `isAuthenticatedRequest`.
 * @returns A Promise that resolves to the JSON response.
 * @throws An Error if the request fails or returns a non-OK status.
 */
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestOptions = {} // Default to an empty object
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();

  // Initialize headers as a plain object to allow direct property assignment
  const headers: Record<string, string> = {};

  // If the request body is JSON, set Content-Type
  // If it's FormData, the browser will set the correct Content-Type automatically.
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Merge any provided headers from options
  if (options.headers) {
    if (options.headers instanceof Headers) {
      // If Headers object, iterate and add
      options.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      // If array of tuples, iterate and add
      options.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      // If plain object, merge properties
      Object.assign(headers, options.headers);
    }
  }

  // Conditionally add Authorization header based on isAuthenticatedRequest flag
  // If isAuthenticatedRequest is explicitly false, do not add the header.
  // Otherwise (undefined or true), add it if a token exists.
  if (options.isAuthenticatedRequest !== false && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers, // Pass the constructed headers object
    });

    if (!response.ok) {
      // Handle 401 Unauthorized specifically
      // Only redirect if it was an authenticated request that failed (i.e., isAuthenticatedRequest was not false)
      if (response.status === 401 && options.isAuthenticatedRequest !== false) {
        console.warn('Unauthorized API request, redirecting to login...');
        removeAuthToken();
        // Throw an error to stop further processing in the calling function
        throw new Error('Unauthorized');
      }

      // For other non-OK responses, try to parse error message from body
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      throw new Error(errorData.message || 'Something went wrong with the API request.');
    }

    // Attempt to parse JSON. If response is 204 No Content, json() will throw error.
    // Handle this gracefully by returning an empty object or null.
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else if (response.status === 204) {
      return null as T; // Or {} as T, depending on expected empty response type
    } else {
      // For other content types or unexpected responses, return response text or throw
      const text = await response.text();
      try {
        return JSON.parse(text); // Try parsing as JSON anyway, just in case
      } catch {
        // If not JSON and not 204, and not parsable as JSON, throw a generic error
        throw new Error(`Unexpected API response format or empty response: ${text.substring(0, 100)}...`);
      }
    }
  } catch (error) {
    console.error('API Request Error:', error);
    throw error; // Re-throw the error for the calling component to handle
  }
};
