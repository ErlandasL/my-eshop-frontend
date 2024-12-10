import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/v1/products'); // API endpoint to get products
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4">
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
          <h3 className="mt-2 text-lg font-bold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
          <p className="mt-2 text-xl font-semibold">${product.price}</p>
          <button className="mt-4 w-full py-2 bg-blue-500 text-white rounded">Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
