"use client"
    import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Product } from '../app/interfaces/Product';

    interface ProductDetailsModalProps {
      show: boolean;
      onClose: () => void;
      product: Product | null;
    }

    const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ show, onClose, product }) => {
      if (!show || !product) {
        return null;
      }

      return (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <div
            className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto relative transform scale-100 opacity-100 transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
              <Image
                src={product.image_url || 'https://placehold.co/600x400/e0e0e0/ffffff?text=No+Image'}
                alt={product.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-2xl font-semibold text-green-700 mb-4">Ksh {(product.price as number || 0).toFixed(2)}</p>

            <h3 className="text-xl font-semibold text-gray-700 mb-2">Description:</h3>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              {product.description}
            </p>

            {product.category_name && (
              <p className="text-sm text-blue-600 mb-2">
                Category: {product.category_name}
              </p>
            )}

            <Link href="/contact" passHref>
              <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-md mt-4">
                Call to Order
              </button>
            </Link>

            <button
              onClick={onClose}
              className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg text-sm transition duration-300 transform hover:scale-105 shadow-md"
            >
              Back To Products
            </button>
          </div>
        </div>
      );
    };

    export default ProductDetailsModal;