import { Product, Category } from './types';

export const categories: Category[] = [
  {
    id: 'pickles',
    name: 'Traditional Pickles',
    image: 'https://images.unsplash.com/photo-1589135233689-83acedd2c243?auto=format&fit=crop&q=80&w=800',
    description: 'Authentic Northeast Indian pickles made with traditional recipes'
  },
  {
    id: 'meat',
    name: 'Roasted Meat',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    description: 'Traditionally smoked and roasted meat delicacies'
  },
  {
    id: 'herbs',
    name: 'Local Herbs',
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&q=80&w=800',
    description: 'Fresh and dried herbs from the Northeast'
  },
  {
    id: 'fish',
    name: 'Dry Fish',
    image: 'https://images.unsplash.com/photo-1574591200982-ee441c80a9a2?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional sun-dried fish specialties'
  }
];

export const products: Product[] = [
  {
    id: 'pickle-1',
    name: 'Bamboo Shoot Pickle',
    category: 'pickles',
    price: 299,
    description: 'Traditional bamboo shoot pickle made with authentic spices',
    longDescription: 'Our bamboo shoot pickle is prepared using age-old traditional methods. Fresh bamboo shoots are carefully selected and processed with local spices to create this authentic delicacy.',
    image: 'https://images.unsplash.com/photo-1589135233689-83acedd2c243?auto=format&fit=crop&q=80&w=800',
    reviews: [
      {
        id: '1',
        author: 'Mira Roy',
        rating: 5,
        comment: 'Authentic taste that reminds me of home!',
        date: '2024-03-15'
      }
    ]
  },
  {
    id: 'meat-1',
    name: 'Smoked Pork',
    category: 'meat',
    price: 599,
    description: 'Traditional oak-smoked pork prepared the authentic way',
    longDescription: 'Our smoked pork is prepared using traditional smoking techniques. The meat is carefully selected and smoked using oak wood, giving it a distinct flavor that\'s cherished across the Northeast.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    reviews: [
      {
        id: '1',
        author: 'John Doe',
        rating: 5,
        comment: 'The best smoked pork I\'ve ever had!',
        date: '2024-03-14'
      }
    ]
  }
];