import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import img1 from "../../assets/images/res1.jpg";
import img2 from "../../assets/images/res2.jpg";
import img3 from "../../assets/images/res3.jpg";
import { useNavigate } from "react-router-dom";

const backgrounds = [img1, img2, img3];

const ManageRestaurant = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Dashboard />

      {/* Main content area */}
      <div
        className="flex-1 min-h-screen bg-cover bg-center px-4 py-20 text-white"
        style={{
          backgroundImage: `url(${backgrounds[bgIndex]})`,
          transition: "background-image 1s ease-in-out",
        }}
      >
        <div className="flex flex-col justify-between items-center h-full">
          <div
            className="p-8 rounded-xl shadow-lg mb-8 text-center"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <h1 className="text-6xl font-bold text-white-900 mb-4">
              Manage Restaurants
            </h1>

            <p className="text-xl text-white-800 max-w-xl italic">
              Easily add, update, or remove restaurant listings to keep your
              platform up to date. Streamline your operations by managing all
              restaurant data from one centralized dashboard.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/view-restaurant")}
            className="mt-auto bg-white text-gray-800 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-gray-100 transition"
          >
            View Restaurants
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageRestaurant;
