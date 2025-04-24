import React from "react";

const HomeCard = ( props ) => {

    const menu = props.menu;

  return (
    <div className="relative flex flex-col w-[250px] h-[260px] bg-white rounded-3xl shadow-xl p-4 mt-12">

      {/* Menu Image */}
      {menu.photos && menu.photos.length > 0 && (
        <img
          src={menu.photos[0]}
          alt={menu.title}
          className="absolute -top-10 left-18 w-26 h-26 rounded-full  border-1 border-amber-500 "
        />
      )}

      {/* Rating */}
      <div className="flex items-center mt-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 fill-[#AE859B] text-[#AE859B]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
        <p className="text-sm pl-1 text-[#AE859B]">4.7</p>
      </div>

      {/* Title & Description */}
      <h3 className="text-md font-semibold text-gray-800 mt-2 leading-6">{menu.title}</h3>
      <p className="text-xs text-gray-600 ">{menu.description}</p>

      
      {/* Price */}
      <div className="absolute flex justify-center items-center w-15 h-12 bottom-2 right-3 bg-[#AE859B] rounded-full text-sm text-white font-medium">
        Rs {menu.price}
      </div>

     
    </div>
  )
};

export default HomeCard;
