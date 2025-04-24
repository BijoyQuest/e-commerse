export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}