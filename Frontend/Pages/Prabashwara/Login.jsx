import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../ReduxToolKit/userSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { email, password };

    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error);
    }

    if (response.ok) {
      setEmail("");
      setPassword("");

      dispatch(
        setUser({
          name: result.name,
          email: result.email,
        })
      );

      if (result.role === "user") {
        navigate("/");
      } else if (result.role === "admin") {
        navigate("/admin");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300">
      <div className="bg-white/30 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md animate-fade-in">
        <h2 className="text-4xl font-extrabold text-center text-orange-800 mb-6 tracking-wide">
          Welcome Back 👋
        </h2>
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-orange-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white/80"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-orange-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-xl border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-white/80"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl"
          >
            Log In
          </button>
        </form>
        <p className="text-center text-sm text-orange-600 mt-6">
          Don't have an account?{" "}
          <span className="underline cursor-pointer hover:text-orange-800">Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
