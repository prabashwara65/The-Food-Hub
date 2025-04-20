import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../Components/Navbar";
import Banner from "../../../Components/BannerRestaurant";
import Footer from "../../../Components/Footer";

const RestaurantDetails = () => {
  const { id } = useParams(); // restaurantId from URL
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/restaurantView/byRestaurant/${id}`)
      .then((res) => res.json())
      .then((data) => setMenus(data))
      .catch((err) => {
        console.error("Error fetching menus:", err);
        setMenus([]);
      });
  }, [id]);

  return (
    <div className="container mx-auto p-4">
        <Navbar />
        <Banner/>
      <h1 className="text-2xl font-bold mb-4">Menu for Restaurant: {id}</h1>
      {menus.length === 0 ? (
        <p>No menu available.</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {menus.map((menu) => (
            <div key={menu.menuId} className="border p-4 rounded shadow">
              <h2 className="font-bold text-lg">{menu.title}</h2>
              <p className="text-sm text-gray-600">{menu.description}</p>
              <p className="font-semibold text-green-700">Rs. {menu.price}</p>
              <p className="text-sm">Category: {menu.category}</p>
              {menu.photos?.length > 0 && (
                <img src={menu.photos[0]} alt={menu.title} className="mt-2 w-full h-40 object-cover rounded" />
              )}
            </div>
          ))}
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default RestaurantDetails;
