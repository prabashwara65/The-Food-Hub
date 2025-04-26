import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

//redux
import { useDispatch } from "react-redux";
import { setOwner } from "../../ReduxToolKit/ownerSlice";

const OwnerLogin = () => {
  const [ownerEmail, setOwnerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4000/api/owner/login", {
        ownerEmail,
        password,
      });
      const ownerData = res.data.owner;

      localStorage.setItem("token", res.data.token);

      dispatch(setOwner(ownerData));
      navigate("/OwnerDashboard")
      
      setMessage("✅ Login successful!");
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">
          Restaurant Owner Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-600"
            >
              {showPassword ? (
                <EyeIcon className="w-5 h-5" />
              ) : (
                <EyeSlashIcon className="w-5 h-5" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="text-center mt-4 text-sm text-red-600 font-semibold">
            {message}
          </p>
        )}
        <p className="text-center text-sm text-blue-600 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/owner/register")}
            className="underline cursor-pointer hover:text-blue-800"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default OwnerLogin;
