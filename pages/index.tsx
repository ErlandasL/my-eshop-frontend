import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

const HomePage: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:4000/api/v1/categories');
      const data = await response.json();
      setCategories(data);
    };

    const fetchProducts = async () => {
      const response = await fetch('http://localhost:4000/api/v1/products');
      const data = await response.json();
      setProducts(data);
    };

    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Left Sidebar for Categories */}
        <Categories categories={categories} />

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="text-center p-8 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to My E-Shop!</h1>
            <p className="text-lg text-gray-600 mb-6">Find the best products at the best prices.</p>

            <div className="flex flex-col gap-4">
              <Link
                href="/login"
                className="inline-block py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-block py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Register
              </Link>
              <Link
                href="/forgot-password"
                className="inline-block py-2 px-4 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Forgot Password
              </Link>
            </div>
          </div>

          {/* Products Section */}
          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
