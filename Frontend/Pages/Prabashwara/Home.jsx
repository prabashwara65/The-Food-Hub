import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../../ReduxToolKit/userSlice";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="h-screen bg-[#F6F6FF]">
      <div className="h-full mx-auto">
        <div className="container flex mx-auto py-8 justify-between items-end ">
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              className="w-3xl focus:outline-none py-4 bg-[#EFEEFE] focus:shadow-amber-600 focus:shadow-sm rounded-full px-4"
              placeholder="Search By food name/Resturant"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8 absolute right-6 top-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>

          {/* +Add order Button */}
          <button className="border-2 ml-8 rounded-3xl p-4 text-white bg-[#B97A9E]">
            {" "}
            + Add Order{" "}
          </button>
        </div>

        <div className="container mx-auto bg-[#F3B734] py-9 pl-3 h-[250px] rounded-3xl">
          <div className="block w-md pl-5">
            <span className="font-bold uppercase">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              tempore aspernatur
            </span>
            <p className="block py-5">
              explicabo illum quidem, repellat fugiat accusamus! Vero quia
              nostrum consectetur aspernatur deleniti!
            </p>
            <button className="rounded-4xl p-4 uppercase bg-[#745200] text-white w-[200px]">Read More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
