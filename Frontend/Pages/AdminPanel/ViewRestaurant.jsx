import React, { useEffect, useState } from "react";
import axios from "axios";
import img1 from "../../assets/images/restaurant1.jpg";
import img2 from "../../assets/images/restaurant2.jpg";
import img3 from "../../assets/images/restaurant3.jpg";
import img4 from "../../assets/images/restaurant4.jpg";
import img5 from "../../assets/images/restaurant5.jpg";
import { useNavigate } from "react-router-dom";

const images = [img1, img2, img3, img4, img5];

const ViewRestaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "http://foodhub.local:30000/api/restaurant/list"
        );
        setRestaurants(response.data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      }
    };

    fetchRestaurants();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      try {
        await axios.delete(`http://foodhub.local:30000/api/restaurant/${id}`);
        setRestaurants(restaurants.filter((res) => res._id !== id));
      } catch (error) {
        console.error("Failed to delete restaurant:", error);
      }
    }
  };

  const handleEditClick = (restaurant) => {
    setEditId(restaurant._id);
    setEditForm({
      name: restaurant.name,
      email: restaurant.email,
      owner: restaurant.owner,
      telephone: restaurant.telephone,
      address: restaurant.address,
    });
  };

  const handleInputChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `http://foodhub.local:30000/api/restaurant/${id}`,
        editForm
      );
      const updatedList = restaurants.map((rest) =>
        rest._id === id ? { ...rest, ...editForm } : rest
      );
      setRestaurants(updatedList);
      setEditId(null);
    } catch (error) {
      console.error("Failed to update restaurant:", error);
    }
  };

  const handleCancel = () => {
    setEditId(null);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Restaurant Details
        </h1>
        <button
          onClick={() => navigate("/admin/add-restaurant")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
        >
          Add Restaurant
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {restaurants.map((restaurant, index) => (
          <div
            key={restaurant._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={images[index % images.length]}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              {editId === restaurant._id ? (
                <>
                  <input
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="w-full border rounded p-1 mb-1"
                  />
                  <input
                    name="owner"
                    value={editForm.owner}
                    onChange={handleInputChange}
                    className="w-full border rounded p-1 mb-1"
                  />
                  <input
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className="w-full border rounded p-1 mb-1"
                  />
                  <input
                    name="telephone"
                    value={editForm.telephone}
                    onChange={handleInputChange}
                    className="w-full border rounded p-1 mb-1"
                  />
                  <input
                    name="address"
                    value={editForm.address}
                    onChange={handleInputChange}
                    className="w-full border rounded p-1 mb-1"
                  />

                  <div className="flex justify-between mt-3">
                    <button
                      onClick={() => handleSave(restaurant._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-2">
                    {restaurant.name}
                  </h3>
                  <p>
                    <strong>ID:</strong> {restaurant.restaurantId}
                  </p>
                  <p>
                    <strong>Owner:</strong> {restaurant.owner}
                  </p>
                  <p>
                    <strong>Email:</strong> {restaurant.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {restaurant.telephone}
                  </p>
                  <p>
                    <strong>Address:</strong> {restaurant.address}
                  </p>

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEditClick(restaurant)}
                      className="bg-blue-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(restaurant._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRestaurant;
