import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, ShoppingCart, Search, X, User, Moon, Sun } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useCartStore, useThemeStore } from '../lib/store';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const { items, fetchCart } = useCartStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className={`${isDarkMode ? 'dark:bg-gray-800 dark:text-white' : 'bg-white'} shadow-md sticky top-0 z-50 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                className="sm:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Link to="/" className="flex items-center">
                <span className={`text-2xl font-bold ${isDarkMode ? 'text-red-400' : 'text-red-900'}`}>
                  Tribal Taste
                </span>
              </Link>
            </div>

            <div className="hidden sm:flex items-center space-x-8">
              <Link to="/categories" className={`${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-900'}`}>
                Categories
              </Link>
              <Link to="/products" className={`${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-900'}`}>
                Products
              </Link>
              <Link to="/about" className={`${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-900'}`}>
                About
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode}
                className={`p-2 ${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-900'}`}
              >
                {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
              </button>
              <button className={`p-2 ${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-900'}`}>
                <Search size={24} />
              </button>
              <button className="p-2 relative" onClick={() => setIsCartOpen(true)}>
                <ShoppingCart size={24} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
                {totalItems > 0 && (
                  <span className={`absolute top-0 right-0 ${isDarkMode ? 'bg-red-400' : 'bg-red-900'} text-white text-xs rounded-full h-5 w-5 flex items-center justify-center`}>
                    {totalItems}
                  </span>
                )}
              </button>
              <Link to="/login" className={`p-2 ${isDarkMode ? 'text-gray-300 hover:text-red-400' : 'text-gray-700 hover:text-red-900'}`}>
                <User size={24} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className={`px-2 pt-2 pb-3 space-y-1 ${isDarkMode ? 'dark:bg-gray-800' : 'bg-white'}`}>
              <Link
                to="/categories"
                className={`block px-3 py-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-red-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/products"
                className={`block px-3 py-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-red-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className={`block px-3 py-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-red-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/login"
                className={`block px-3 py-2 ${isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-red-50'}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        )}
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}