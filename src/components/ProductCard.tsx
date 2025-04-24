import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../lib/types';
import { useCartStore, useThemeStore } from '../lib/store';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { isDarkMode } = useThemeStore();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    await addItem(product, 1);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg shadow-md overflow-hidden transition-all duration-200`}
    >
      <div className="aspect-w-1 aspect-h-1">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {product.name}
        </h3>
        <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className={`text-xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-900'}`}>
            ₹{product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className={`${
              isDarkMode 
                ? 'bg-red-400 hover:bg-red-500' 
                : 'bg-red-900 hover:bg-red-800'
            } text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2`}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}