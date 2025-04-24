import React from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data';
import { Star, ShoppingCart } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-red-900 mb-4">₹{product.price}</p>
          <p className="text-gray-600 mb-6">{product.longDescription}</p>
          <button className="w-full bg-red-900 text-white px-6 py-3 rounded-md hover:bg-red-800 transition-colors flex items-center justify-center gap-2">
            <ShoppingCart size={20} />
            Add to Cart
          </button>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
            {product.reviews.map(review => (
              <div key={review.id} className="border-b py-4">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">{review.author}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-sm text-gray-500 mt-1">{review.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}