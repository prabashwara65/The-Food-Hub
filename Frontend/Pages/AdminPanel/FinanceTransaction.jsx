import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const FinanceTransaction = () => {
  const [summary, setSummary] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "http://foodhub.local:30000/api/finance/overview"
        );
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching financial summary:", error);
      }
    };

    fetchSummary();

    const interval = setInterval(fetchSummary, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!summary) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">Loading...</div>
    );
  }

  const totalAdmin = summary.totalRevenue?.admin ?? 0;
  const totalDelivery = summary.totalRevenue?.delivery ?? 0;
  const totalRestaurant = summary.totalRevenue?.restaurant ?? 0;
  const totalAmount = totalAdmin + totalDelivery + totalRestaurant;

  const chartData = [
    { name: "Admin Commission", amount: totalAdmin },
    { name: "Delivery Fee", amount: totalDelivery },
    { name: "Restaurant Earnings", amount: totalRestaurant },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-6">
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center text-indigo-700">
        Financial Transaction Summary
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-gray-500 text-sm font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold text-indigo-600 mt-2">
            ${totalAmount.toLocaleString()}
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-gray-500 text-sm font-semibold">Admin Commission</h2>
          <p className="text-2xl font-bold text-green-600 mt-2">
            ${totalAdmin.toLocaleString()}
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-gray-500 text-sm font-semibold">Delivery Fee</h2>
          <p className="text-2xl font-bold text-orange-500 mt-2">
            ${totalDelivery.toLocaleString()}
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
          <h2 className="text-gray-500 text-sm font-semibold">Restaurant Earnings</h2>
          <p className="text-2xl font-bold text-purple-600 mt-2">
            ${totalRestaurant.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-600">
        <p className="text-lg font-medium">
          Total Orders:{" "}
          <span className="text-indigo-700 font-semibold">
            {summary.totalOrders}
          </span>
        </p>
        <p className="text-lg font-medium mt-1">
          Total Restaurants:{" "}
          <span className="text-indigo-700 font-semibold">
            {summary.totalRestaurants}
          </span>
        </p>
      </div>

      {/* Bar Chart Section */}
      <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Earnings Breakdown
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#6366f1" radius={[10, 10, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceTransaction;
