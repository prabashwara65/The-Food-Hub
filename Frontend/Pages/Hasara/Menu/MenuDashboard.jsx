import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import AddMenuModal from "./AddMenu";
import MenuCard from "./MenuCard";
import toast, { Toaster } from "react-hot-toast";
import UpdateMenu from "./UpdateMenu";

const MenuDashboard = ({restaurantId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menus, setMenus] = useState([]);
  const [updateMenuId, setUpdateMenuId] = useState(null)
  

  useEffect(() => {
    const fetchMenus = async () => {
      if (!restaurantId) return; 
      try {
        const response = await fetch(`http://localhost:4004/api/menu/menus/${restaurantId}`);
        if (!response.ok) throw new Error("Failed to fetch menus");

        const json = await response.json();
        setMenus(json);
      } catch (error) {
        toast.error("Error fetching menu data.");
        console.error("Fetch Error:", error);
      }
    };

    fetchMenus();
  }, [restaurantId]);

  const handleUpdate = (id) => {
    setUpdateMenuId(id); // set the menu id to update
  };


  const handleUpdateSuccess = () => {
    setUpdateMenuId(null); // close modal after update
    // refetch menus after update
    fetchMenus();
  };

  const fetchMenus = async () => {
    if (!restaurantId) return;
    try {
      const response = await fetch(`http://localhost:4004/api/menu/menus/${restaurantId}`);
      if (!response.ok) throw new Error("Failed to fetch menus");

      const json = await response.json();
      setMenus(json);
    } catch (error) {
      toast.error("Error fetching menu data.");
      console.error("Fetch Error:", error);
    }
  };


  // Delete menu
  const handleDelete = async (id) => {
    toast(
      (t) => (
        <div>
          <p>Are you sure you want to delete this item?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md"
              onClick={async () => {
                try {
                  const response = await fetch(
                    `http://localhost:4004/api/menu/${id}`,
                    {
                      method: "DELETE",
                    }
                  )

                  if (response.ok) {
                    setMenus((prevMenus) =>
                      prevMenus.filter((menu) => menu._id !== id)
                    );
                    toast.success("Menu item deleted successfully!");
                  } else {
                    toast.error("Failed to delete menu item.");
                  }
                } catch (error) {
                  console.error("Error deleting menu:", error);
                  toast.error("An error occurred while deleting.");
                }
                toast.dismiss(t.id);
              }}>
              Yes
            </button>
            <button
              className="px-3 py-1 bg-gray-300 text-black rounded-md"
              onClick={() => toast.dismiss(t.id)} >
              No
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
      }
    );
  };



  return (
    <div className="p-6">
      <Toaster />

      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-bold text-black">Menu Gallery</h2>
      </div>

      {/* Add Menu Button */}
      <button
        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusCircle size={20} />
        Add New Menu
      </button>

      {/* Add Menu Modal */}
      <AddMenuModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {menus.length > 0 ? (
          menus.map((menu) => (
            <MenuCard key={menu._id} menu={menu} onDelete={handleDelete} onUpdate={handleUpdate} />
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No menu items found.
          </p>
        )}
      </div>
       {/* Update Menu Modal */}
      {updateMenuId && (
        <UpdateMenu
          isOpen={!!updateMenuId}
          onClose={() => setUpdateMenuId(null)}
          menuId={updateMenuId}
          onUpdateSuccess={handleUpdateSuccess} // refetch after update
        />
      )}
    </div>
  );
};

export default MenuDashboard;
