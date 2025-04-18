import React, { useState } from "react";
import { RiFacebookLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { RiGoogleLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";

const Register = () => {
  const [isHovered, setIsHovered] = useState(false);

  const Interstyle = { color: "gray", fontSize: "30px" };
  const Outerstyle = {
    color: isHovered ? "black" : "gray",
    fontSize: "25px",
  };

  return (
    <div className="min-h-screen py-28 bg-[#38AA9A] ">
      <div className="flex flex-col bg-gray-100 items-center mx-auto w-lg h-full text-2xl rounded-3xl p-10 shadow-2xs">
        <span className="text-[#38AA9A] font-bold">Create An Account</span>

        <div className="flex flex-row space-between gap-4 mt-7">
          <div className="border rounded-full p-2 hover:bg-blue-500">
            <RiFacebookLine
              style={Outerstyle}
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => setIsHovered(false)}
            />
          </div>
          <div className="border rounded-full p-2 hover:bg-red-500">
            <RiGoogleLine style={Outerstyle} />
          </div>
          <div className="border rounded-full p-2 ">
            <FaInstagram style={Outerstyle} />
          </div>
        </div>
        <div className="flex flex-col mt-6 gap-1 w-sm">
          <input
            type="text"
            placeholder="Name"
            className="border-0 p-2 m-2 bg-gray-300 relative placeholder:pl-8 placeholder:text-[20px] placeholder:pb-2 placeholder:text-black shadow-sm "
          />
          <CgProfile className="absolute mt-5 ml-4 " style={Interstyle} />
          <input
            type="text"
            placeholder="Email"
            className="border-0 p-2 m-2 bg-gray-300 relative placeholder:pl-8 placeholder:text-[20px] placeholder:pb-2 placeholder:text-black shadow-sm"
          />
          <CgProfile className="absolute mt-22 ml-4 " style={Interstyle} />
          <input
            type="text"
            placeholder="Password"
            className="border-0 p-2 m-2 bg-gray-300 relative placeholder:pl-8 placeholder:text-[20px] placeholder:pb-2 placeholder:text-black shadow-sm"
          />
          <CgProfile className="absolute mt-39 ml-4 " style={Interstyle} />
        </div>

        <button className="border-0 bg-[#38AA9A] m-8 w-sm p-2 rounded-3xl text-white">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
