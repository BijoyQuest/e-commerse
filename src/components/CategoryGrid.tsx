import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Category } from '../lib/types';
import { useThemeStore } from '../lib/store';

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('name');

        if (error) {
          throw error;
        }

        setCategories(data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 py-12 ${isDarkMode ? 'dark:bg-gray-900' : ''}`}>
      <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'dark:text-white' : 'text-gray-800'}`}>
        Our Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/products?category=${category.id}`}
            className="group relative overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105"
          >
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={category.image_url}
                alt={category.name}
                className="object-cover w-full h-64"
              />
              <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/60' : 'bg-black/40'}`}></div>
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}