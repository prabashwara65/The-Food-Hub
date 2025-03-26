import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import AddMenuModal from './AddMenu';

const Menu = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

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
    </div>
  );
};

export default Menu;
