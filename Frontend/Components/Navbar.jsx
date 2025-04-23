import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user?.name && !!user?.email;

  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="container mx-auto w-full h-2xl p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">The Food Hub</h3>
        <ul className="flex flex-row gap-7 justify-center cursor-pointer font-extralight bg-[#F4F6F6] p-4 rounded-3xl">
          <Link to='/' >Home</Link>
          <Link to='#'>Service</Link>
          <Link to='#'>Order</Link>
          <Link to='#'>Restuarant</Link>
          <Link to='#'>Feedback</Link>
        </ul>
        <div className="flex gap-2 pl-2 items-center relative">
          {isLoggedIn && (
            <Link to="/cart" className="relative p-4 bg-[#F4F6F6] rounded-3xl">
              🛒
              {cartItems.length >= 0 && (
                <span className="absolute -bottom-1 -right-0 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </Link>
          )}
          <button className="p-4 bg-[#F4F6F6] rounded-3xl font-extralight">
            {isLoggedIn ? `Hi, ${user.name}` : 'SIGNIN'}
          </button>
          <button className="p-4 bg-[#F4F6F6] rounded-3xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 font-extralight"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
