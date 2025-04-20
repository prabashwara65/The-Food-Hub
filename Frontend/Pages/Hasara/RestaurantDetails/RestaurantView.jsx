import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../Components/Navbar";
import Banner from "../../../Components/BannerRestaurant";
import Footer from "../../../Components/Footer";
import { FaShoppingCart } from "react-icons/fa";

const RestaurantDetails = () => {
  const { id } = useParams(); // restaurantId from URL
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/restaurantView/byRestaurant/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Filter menus to only include available ones
        const availableMenus = data.filter((menu) => menu.availability === true);
        setMenus(availableMenus);
      })
      .catch((err) => {
        console.error("Error fetching menus:", err);
        setMenus([]);
      });
  }, [id]);

  return (
    <div className="container mx-auto p-2">
        <Navbar />
       <div className="bg-orange-100 rounded-xl p-5 "> 
        <Banner restaurantId={id}/>
      {menus.length === 0 ? (
        <p>No menu available.</p>
      ) : (
        <div className="grid gap-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5">
          {menus.map((menu) => (
          <div key={menu.menuId} className="p-4 rounded shadow-xl bg-white/75 backdrop-blur-sm flex flex-col justify-between h-full">
           <div>
              <h2 className="font-bold text-lg">{menu.title}</h2>
              {menu.photos?.length > 0 && (
               <img src={menu.photos[0]} alt={menu.title} className="mt-2 w-full h-45 object-cover rounded" />
             )}
             <p className="font-semibold mt-2">Rs. {menu.price}</p>
           </div>

          <div className="mt-2 flex justify-between items-center">
              <button className="text-blue-600 hover:underline text-sm">View More</button>
              <button className="bg-green-600 text-white px-2 py-1 rounded flex items-center gap-2 hover:bg-green-700 transition">
              <FaShoppingCart /> Add to Cart
              </button>
        </div>
        </div>
        ) )}
        </div>
      )}
      </div>
      <Footer/>
    </div>
  );
};

export default RestaurantDetails;
