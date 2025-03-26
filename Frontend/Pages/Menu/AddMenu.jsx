import React from 'react';

const AddMenuModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-100 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 bg-opacity-50 ">
        <h2 className="text-lg font-bold mb-4">Add New Menu Item</h2>
     
        <input 
          type="text" placeholder="Menu Name" className="w-full p-2 mb-3 border rounded-lg"/>
          <input 
          type="text" 
          placeholder="Menu Name" 
          className="w-full p-2 mb-3 border rounded-lg"
        />
        <input 
          type="number" 
          placeholder="Price" 
          className="w-full p-2 mb-3 border rounded-lg"
        />

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">Cancel</button>
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMenuModal;
