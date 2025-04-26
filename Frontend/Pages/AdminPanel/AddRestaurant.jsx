import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/images/bg1.jpeg";

const AddRestaurant = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    owner: "",
    telephone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:4000/api/restaurant/add", formData);
      navigate("/admin/view-restaurant");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className="p-8 rounded-lg shadow-md w-full max-w-2xl"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add Restaurant</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Restaurant Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Restaurant Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="text"
            name="owner"
            placeholder="Owner Name"
            value={formData.owner}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <input
            type="tel"
            name="telephone"
            placeholder="Telephone Number"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
          <textarea
            name="address"
            placeholder="Restaurant Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          ></textarea>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRestaurant;
