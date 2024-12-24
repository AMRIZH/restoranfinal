// src\pages\menu_details\[id].tsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Image from "next/image";

interface Menu {
  id: number;
  category: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const MenuDetails: React.FC = () => {
  const [menu, setMenu] = useState<Menu | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchMenu = async () => {
      if (id) {
        try {
          const response = await fetch(
            `https://yoloverse.pythonanywhere.com/api/menus/`
          );
          const data = await response.json();
          const selectedMenu = data.find(
            (item: Menu) => item.id === Number(id)
          );
          setMenu(selectedMenu || null);
        } catch (error) {
          console.error("Error fetching menu:", error);
        }
      }
    };

    fetchMenu();
  }, [id]);

  const handleBackToMenu = () => {
    router.push("/menus");
  };

  if (!menu) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-start gap-8">
            <Image
              src={menu.image}
              alt={menu.name}
              width={192}
              height={192}
              className="object-cover rounded-lg mb-6 md:mb-0"
            />
            <div className="flex flex-col flex-grow">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {menu.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{menu.category}</p>
              <p className="text-sm text-gray-700 mb-6">{menu.description}</p>
              <div className="flex justify-between items-center">
                <p className="font-semibold text-xl text-blue-600">
                  ${menu.price.toFixed(2)}
                </p>
                <button
                  onClick={handleBackToMenu}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MenuDetails;
