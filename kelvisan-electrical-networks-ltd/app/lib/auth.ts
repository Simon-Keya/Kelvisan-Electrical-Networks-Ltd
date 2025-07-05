// lib/auth.ts
// This file handles storing, retrieving, and removing the JWT token from local storage.
// It is now designed to be safe for both server-side (SSR) and client-side rendering.

const TOKEN_KEY = 'admin_jwt_token';

/**
 * Stores the JWT token in local storage.
 * This function should ideally only be called on the client side.
 * @param token The JWT token string.
 */
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') { // Ensure localStorage is available
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token to local storage:', error);
      // Handle cases where localStorage might not be available or write fails
    }
  } else {
    // console.warn('Attempted to set token on server, operation skipped.');
  }
};

/**
 * Retrieves the JWT token from local storage.
 * This function is safe to call in any environment as it checks for window.
 * @returns The JWT token string, or null if not found.
 */
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') { // Ensure localStorage is available
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error retrieving token from local storage:', error);
      return null;
    }
  }
  return null; // Return null if not in a browser environment
};

/**
 * Removes the JWT token from local storage.
 * This function should ideally only be called on the client side.
 */
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') { // Ensure localStorage is available
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token from local storage:', error);
    }
  } else {
    // console.warn('Attempted to remove token on server, operation skipped.');
  }
};

/**
 * Checks if a token exists in local storage.
 * This function is safe to call in any environment as it relies on getAuthToken.
 * @returns True if a token exists, false otherwise.
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};
