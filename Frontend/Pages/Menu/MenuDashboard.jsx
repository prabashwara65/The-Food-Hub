import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import AddMenuModal from "./AddMenu";
import MenuCard from "./MenuCard"; 

const MenuDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menus, setMenus] = useState([]); 

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/menu");
        const json = await response.json();

        if (response.ok) {
          setMenus(json);
        }
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenus();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold text-black">Menu Gallery</h2>
      </div>

      {/* Add Menu Button */}
      <button
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusCircle size={20} />
        Add Menu
      </button>

      {/* Add Menu Modal */}
      <AddMenuModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Menu Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {menus.length > 0 ? (
          menus.map((menu) => <MenuCard key={menu._id} menu={menu} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full">No menu items found.</p>
        )}
      </div>

      <botton>
        
      </botton>
    </div>
  );
};

export default MenuDashboard;
