// src/pages/menus.tsx

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Carousel from "@/components/Carousel";

interface Menu {
  id: number;
  category: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const Menus: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch menu data from API
    const fetchMenus = async () => {
      try {
        const response = await fetch(
          "https://yoloverse.pythonanywhere.com/api/menus/"
        );
        const data = await response.json();
        setMenus(data);
        setFilteredMenus(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      }
    };

    fetchMenus();
  }, []);

  // Filter menus by category
  useEffect(() => {
    let updatedMenus = menus;

    if (selectedCategory !== "All") {
      updatedMenus = menus.filter((menu) => menu.category === selectedCategory);
    }

    if (searchTerm) {
      updatedMenus = updatedMenus.filter((menu) =>
        menu.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMenus(updatedMenus);
  }, [menus, searchTerm, selectedCategory]);

  const handleAddToCart = (menu: Menu) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cart.find((item: Menu) => item.id === menu.id);

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...menu, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Tampilkan notifikasi sukses
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Menu</h1>

        <Carousel />

        {/* Notifikasi */}
        {showNotification && (
          <div className="fixed top-5 right-5 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
            Item berhasil ditambahkan ke keranjang!
          </div>
        )}

        {/* Filter and Search */}
        <div className="border p-4 rounded-lg mb-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <div>
            <label className="font-semibold mr-2">Category:</label>
            <select
              className="border rounded-md p-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Pembuka">Pembuka</option>
              <option value="Utama">Utama</option>
              <option value="Penutup">Penutup</option>
            </select>
          </div>
          <div>
            <label className="font-semibold mr-2">Search:</label>
            <input
              type="text"
              className="border rounded-md p-2"
              placeholder="Search menu name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Menu items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMenus.map((menu) => (
            <div
              key={menu.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Image
                src={menu.image}
                alt={menu.name}
                width={500}
                height={224}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {menu.name}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{menu.category}</p>
                <p className="text-gray-500 text-base mt-2">
                  {menu.description.slice(0, 100)}...
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-blue-600">
                    ${menu.price.toFixed(2)}
                  </span>
                  <button
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
                    onClick={() => handleAddToCart(menu)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Menus;







