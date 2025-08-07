export interface Product {
  id?: string; // Changed to string (UUID)
  name: string;
  image_url: string; // Changed to image_url to match backend
  description: string;
  price: number; // Backend parses to number
  category_id?: string | null; // Changed to string (UUID) or null
  category_name?: string;
}

export interface Category {
  id?: string; // Changed to string (UUID)
  name: string;
  description?: string;
  created_at?: Date;
}
// Add NewsletterSubscriber interface
export interface NewsletterSubscriber {
  id?: number;
  email: string;
  subscribed_at?: Date; // Assuming this is the column name in your DB
}