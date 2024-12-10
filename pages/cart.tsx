import { useState } from "react";
import Link from "next/link";
import UserForm from "@/components/UserForm";

const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "iPhone 14",
      price: 999.99,
      quantity: 1,
      imageUrl: "https://example.com/iphone14.jpg",
    },
    {
      id: 2,
      name: "MacBook Air",
      price: 1199.99,
      quantity: 1,
      imageUrl: "https://example.com/macbookair.jpg",
    },
  ]);

  const handleRemoveItem = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-4 bg-white p-4 rounded-lg shadow">
            <div className="flex items-center">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded mr-4" />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                className="w-16 p-2 border rounded text-center"
              />
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="ml-4 text-red-500 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold">Total: ${calculateTotal()}</h2>
      </div>

      {/* User Information Form */}
      <UserForm />
    </div>
  );
};

export default CartPage;
