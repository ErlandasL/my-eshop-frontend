import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

interface ProductPageProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category: {
      name: string;
    };
  };
}

const ProductPage: React.FC<ProductPageProps> = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">${parseFloat(product.price).toFixed(2)}</p>
          <p className="text-gray-600 mt-4">{product.description}</p>
          <p className="text-sm text-gray-500 mt-2">Category: {product.category.name}</p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const response = await fetch(`http://localhost:4000/api/v1/products/${id}`);
  const product = await response.json();

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
