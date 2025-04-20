import React from "react";
import { Edit, Trash2 } from "lucide-react";

const MenuCard = ({ menu, onUpdate, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4">
      {/* Menu Image - Display the first image in the array */}
      {menu.photos && menu.photos.length > 0 && (
        <img
          src={menu.photos[0]} // Access the first image in the array
          alt={menu.title}
          className="w-full h-40 object-cover rounded-lg"
        />
      )}

      <h3 className="text-lg font-bold text-gray-800 mt-2">{menu.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{menu.description}</p>

      <div className="flex justify-between items-center mt-3">
        <span className="text-lg font-semibold text-orange-500">Rs {menu.price}</span>
        <span
          className={`px-2 py-1 text-xs font-semibold rounded ${
            menu.availability ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {menu.availability ? "Available" : "Unavailable"}
        </span>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => onUpdate(menu._id)}
          className="items-center mr-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Edit size={16} />
        </button>

        <button
          onClick={() => onDelete(menu._id)}
          className="items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
