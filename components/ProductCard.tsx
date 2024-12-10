import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
  };
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600">${parseFloat(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
