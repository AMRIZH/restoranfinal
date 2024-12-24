// Cart.tsx

// Define the structure of a Menu item
interface Menu {
  id: number;
  name: string;
  price: number;
  image: string;
}

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

// Define the structure of a CartItem (inherits from Menu and adds quantity)
interface CartItem extends Menu {
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const router = useRouter();

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(storedCart);
    calculateTotal(storedCart);
  }, []);

  // Calculate the total price for all cart items
  const calculateTotal = (items: CartItem[]) => {
    const newTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  };

  // Update the quantity of a specific item in the cart
  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Remove an item from the cart
  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // Handle the checkout process
  const handleCheckout = () => {
    // Here you would typically integrate with a payment gateway
    // For this example, we'll just clear the cart and show a thank you message
    localStorage.removeItem("cart");
    router.push("/thank-you"); // Navigate to the Thank You page
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-xl">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="text-2xl"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="text-2xl"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-right">
              <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
              <button
                className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Cart;
