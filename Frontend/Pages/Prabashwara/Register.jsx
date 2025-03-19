import React from "react";
import { CiFacebook } from "react-icons/ci";

const Register = () => {
  return (
    <div className="w-full min-h-screen py-28 bg-[#38AA9A]">
      <div className="flex flex-col items-center bg-gray-200 mx-auto w-xl h-96 text-2xl rounded-3xl p-10 font-poppins">
        Register
        <CiFacebook />
        <input type="text" className="" />
      </div>
    </div>
  );
};

export default Register;
