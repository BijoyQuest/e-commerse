/*
  # Add initial products

  1. Changes
    - Insert initial products into the products table
    - Link products to existing categories
*/

INSERT INTO products (name, description, long_description, price, image_url, category_id, stock)
SELECT 
  'Bamboo Shoot Pickle',
  'Traditional bamboo shoot pickle made with authentic spices',
  'Our bamboo shoot pickle is prepared using age-old traditional methods. Fresh bamboo shoots are carefully selected and processed with local spices to create this authentic delicacy.',
  299,
  'https://images.unsplash.com/photo-1589135233689-83acedd2c243?auto=format&fit=crop&q=80&w=800',
  id,
  50
FROM categories 
WHERE name = 'Traditional Pickles';

INSERT INTO products (name, description, long_description, price, image_url, category_id, stock)
SELECT 
  'Smoked Pork',
  'Traditional oak-smoked pork prepared the authentic way',
  'Our smoked pork is prepared using traditional smoking techniques. The meat is carefully selected and smoked using oak wood, giving it a distinct flavor that''s cherished across the Northeast.',
  599,
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
  id,
  30
FROM categories 
WHERE name = 'Roasted Meat';

INSERT INTO products (name, description, long_description, price, image_url, category_id, stock)
SELECT 
  'Mixed Herbs Bundle',
  'Carefully selected mix of traditional Northeast herbs',
  'A curated selection of essential Northeast Indian herbs, perfect for traditional recipes. Each bundle contains a variety of fresh, aromatic herbs.',
  199,
  'https://images.unsplash.com/photo-1515586000433-45406d8e6662?auto=format&fit=crop&q=80&w=800',
  id,
  100
FROM categories 
WHERE name = 'Local Herbs';

INSERT INTO products (name, description, long_description, price, image_url, category_id, stock)
SELECT 
  'Premium Dry Fish',
  'Traditional sun-dried fish prepared using ancestral methods',
  'Our premium dry fish is prepared using time-tested traditional methods. Each piece is carefully sun-dried to preserve its authentic flavor and nutritional value.',
  399,
  'https://images.unsplash.com/photo-1574591200982-ee441c80a9a2?auto=format&fit=crop&q=80&w=800',
  id,
  40
FROM categories 
WHERE name = 'Dry Fish';