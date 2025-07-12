// interfaces/Product.ts (or interfaces/index.ts)

// Define the Product interface in a central location
export interface Product {
  id?: number; // Optional as it might not exist when creating a new product
  name: string;
  image: string; // This will store the URL of the uploaded image
  description: string;
  price: number | string; // Allow price to be string when fetched from DB, number for internal use
  category_id?: number | null; // Optional, can be null if uncategorized
  category_name?: string | null; // For display purposes, typically joined from backend
  created_at?: Date; // Optional, read-only from backend
}

// Define the Category interface here as well, if it's also shared
export interface Category {
  id: number;
  name: string;
}

// Add NewsletterSubscriber interface
export interface NewsletterSubscriber {
  id?: number;
  email: string;
  subscribed_at?: Date; // Assuming this is the column name in your DB
}