import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeStore } from '../lib/store';

export default function Hero() {
  const navigate = useNavigate();
  const { isDarkMode } = useThemeStore();

  const handleExplore = () => {
    navigate('/products');
  };

  return (
    <div 
      className="relative h-[70vh] bg-cover bg-center" 
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&q=80&w=1920')`
      }}
    >
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-40'}`}></div>
      <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
          Flavors of the Northeast
        </h1>
        <p className="text-xl md:text-2xl text-center max-w-2xl">
          Discover authentic traditional foods from Northeast India
        </p>
        <button 
          onClick={handleExplore}
          className={`mt-8 px-8 py-3 ${
            isDarkMode 
              ? 'bg-red-400 hover:bg-red-500' 
              : 'bg-red-900 hover:bg-red-800'
          } text-white rounded-md transition-colors duration-200`}
        >
          Explore Our Products
        </button>
      </div>
    </div>
  );
}