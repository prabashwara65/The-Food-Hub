import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaFacebookF, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Banner = ({ restaurantId }) => {
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    if (restaurantId) {
      fetch(`http://localhost:4000/api/restaurantView/${restaurantId}`)
        .then((res) => res.json())
        .then((data) => setRestaurant(data))
        .catch((err) => {
          console.error("Error fetching restaurant details:", err);
          setRestaurant(null);
        });
    }
  }, [restaurantId]);



  return (
    <div className="">
      <div className="container relative mx-auto bg-[#FFBD73] py-5 px-5 md:h-[250px] rounded-xl 
      overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Text Content */}
        <div className="flex flex-col gap-3 max-w-xl ml-5">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#2F2F2F]">{restaurant?.name || "Loading..."}</h3>

          {/* Contact Info */}
          <div className="mt-2 space-y-1 text-lg text-[#2F2F2F]">
            <p className="flex items-center gap-3">
              <FaPhoneAlt /> {restaurant?.mobile || "+39 123 456 789"}
            </p>
            <p className="flex items-center gap-3">
              <FaMapMarkerAlt /> {restaurant?.location || "Unknown location"}
            </p>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-3 text-[#2F2F2F] text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-blue-600">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Whatsapp" className="hover:text-emerald-500">
              <FaWhatsapp />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-pink-500">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="md:block">
          <img
            src="/restaurant.png"
            alt="restaurant"
            className="w-[15rem] md:w-[20rem]   h-[15rem] md:h-[20rem] "
          />
        </div>

      </div>
    </div>
  );
};

export default Banner;
