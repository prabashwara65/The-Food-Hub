import React from "react";
import { RiFacebookLine, RiGoogleLine } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdEmail, MdLockOutline } from "react-icons/md";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-300 to-yellow-200 py-16 px-4">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-orange-500 mb-6">
          Create an Account
        </h2>

        <div className="flex justify-center gap-6 mb-6">
          <div className="p-3 rounded-full bg-gray-200 hover:bg-blue-500 hover:text-white transition">
            <RiFacebookLine size={24} />
          </div>
          <div className="p-3 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition">
            <RiGoogleLine size={24} />
          </div>
          <div className="p-3 rounded-full bg-gray-200 hover:bg-pink-500 hover:text-white transition">
            <FaInstagram size={24} />
          </div>
        </div>

        <form className="space-y-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <CgProfile className="absolute left-4 top-2.5 text-gray-500" size={22} />
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <MdEmail className="absolute left-4 top-2.5 text-gray-500" size={22} />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <MdLockOutline className="absolute left-4 top-2.5 text-gray-500" size={22} />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span className="text-orange-500 font-medium hover:underline cursor-pointer">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
