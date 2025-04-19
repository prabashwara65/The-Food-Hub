import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const AddMenuModal = ({ isOpen, onClose }) => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState(false);
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setPhotos((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("availability", availability);
    formData.append("price", price);

    photos.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const response = await fetch("http://localhost:8000/api/menu", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Something went wrong.");
        toast.error(json.error || "Upload failed.");
      } else {
        setTitle("");
        setDescription("");
        setCategory("");
        setAvailability(false);
        setPrice("");
        setPhotos([]);
        setError(null);
        toast.success("Menu item added successfully!");
        onClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading menu item.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-orange-100 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-4xl flex flex-col">
        <form className="create" onSubmit={handleSubmit}>
          <div className="flex-1 mr-4">
            <h2 className="text-lg font-bold mb-2">Add New Menu Item</h2>

            <label className="block font-semibold mb-1">Menu Name</label>
            <input
              type="text"
              placeholder="Enter menu name"
              className="w-full p-2 mb-2 border rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label className="block font-semibold mb-1">Description</label>
            <textarea
              placeholder="Enter description"
              className="w-full p-2 mb-2 border rounded-lg h-15 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label className="block font-semibold mb-1">Category</label>
            <select
              className="w-full p-3 mb-3 border rounded-lg bg-white"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
              <option value="appetizers">Appetizers</option>
              <option value="mainCourses">Main Courses</option>
              <option value="sides">Sides</option>
              <option value="desserts">Desserts</option>
              <option value="beverages">Beverages</option>
              <option value="breakfast&Brunch">Breakfast & Brunch</option>
            </select>

            <label className="block font-semibold mb-1">Availability</label>
            <div className="relative w-10 mb-2">
              <input
                id="switch-availability"
                type="checkbox"
                className="peer hidden"
                checked={availability}
                onChange={() => setAvailability(!availability)}
              />
              <div className="w-10 h-5 bg-slate-100 rounded-full peer-checked:bg-green-600 transition-colors duration-300 cursor-pointer border border-gray-500"></div>
              <label
                htmlFor="switch-availability"
                className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-black shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-green-600 cursor-pointer"
              ></label>
            </div>

            <label className="block font-semibold mb-1">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              className="w-full p-2 mb-3 border rounded-lg"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="w-80">
            <label className="block font-semibold mb-1">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="w-full p-2 mb-3 border rounded-lg cursor-pointer"
              onChange={handleImageChange}
            />

            <div className="flex gap-2 flex-wrap">
              {photos.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-400 text-white p-1 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              Save
            </button>
          </div>

          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;
