// components/ProductCard.tsx
"use client"; // This component uses client-side hooks like useState
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Product } from '../app/interfaces/Product'; // Adjust path based on your project structure

interface ProductCardProps {
  product: Product;
  // Make onViewDetails optional. If provided, it triggers a modal.
  // If not, the button will link to the general products page.
  onViewDetails?: (product: Product) => void;
  // isModalOpenForThisProduct is only relevant when onViewDetails is provided
  isModalOpenForThisProduct?: boolean;
}

// Framer Motion variant for individual card animation
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
};

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, isModalOpenForThisProduct }) => {
 const phoneNumber = "+254711762682"; // Consider making this an environment variable or fetching from config
 // Construct the pre-filled WhatsApp message with product details
const whatsappMessage = `Hello, I'm interested in ordering the product: ${product.name} (Ksh ${(product.price as number || 0).toFixed(2)}). Please provide more details.`;
 
// Encode the message for use in a URL
 const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div
      variants={itemVariants} // Apply motion to the card for animation
      className="bg-white rounded-xl shadow-md overflow-hidden
                 hover:shadow-xl hover:scale-102 transition-all duration-300
                 border border-gray-200 hover:border-blue-400 flex flex-col"
      tabIndex={0}
      role="listitem"
      aria-label={`Product: ${product.name}`}
    >
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <Image
          src={product.image_url || 'https://placehold.co/400x300/e0e0e0/ffffff?text=No+Image'}
          alt={`Image of ${product.name}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            console.error('Image loading error for product:', product.name, e.currentTarget.src);
          }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={onViewDetails ? true : false} // Priority if it's on the main products page (likely above fold)
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 min-h-[3rem] line-clamp-2">
          {product.name}
        </h2>

        <div className="mb-2">
          <span className="text-2xl font-bold text-green-700">Ksh {(product.price as number || 0).toFixed(2)}</span>
        </div>
        {/* Conditional rendering for the "View Details" button behavior */}
        {onViewDetails ? (
          <button
            onClick={() => onViewDetails(product)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-md mb-4"
            aria-haspopup="dialog"
            aria-expanded={isModalOpenForThisProduct}
          >
            View Details
          </button>
        ) : (
          <Link href={`/products`} passHref className="block mb-4"> {/* Link to general products page */}
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-md"
              aria-label={`View product details for ${product.name}`}
            >
              View Product
            </button>
          </Link>
        )}

        {/* The new "Order on WhatsApp" button */}
        <Link
          href={whatsappLink}
          passHref
          className="mt-auto block"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-md"
            aria-label={`Order ${product.name} on WhatsApp`}
          >
            Order on WhatsApp
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
