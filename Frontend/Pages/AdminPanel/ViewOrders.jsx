import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const navigate = useNavigate();

  const colors = [
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-pink-100",
    "bg-purple-100",
    "bg-indigo-100",
    "bg-teal-100",
    "bg-rose-100",
    "bg-orange-100",
    "bg-lime-100",
  ];

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://foodhub.local:30003/api/order/getOrders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update Order
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`http://foodhub.local:30003/api/order/update/${id}`, {
        status: newStatus,
      });
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete Order
  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://foodhub.local:30003/api/order/delete/${id}`);
        fetchOrders();
      } catch (error) {
        console.error(error);
      }
    }
  };

  //Filter orders based on email
  const filteredOrders = orders.filter((order) =>
    order.email.toLowerCase().includes(searchEmail.toLowerCase())
  );

  return (
    <div className="p-6">
      <button
        onClick={() => navigate("/admin/manage-orders")}
        className="mb-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center">
        View Customer Orders
      </h1>

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order, index) => (
          <div
            key={order._id}
            className={`p-6 rounded-xl shadow-md flex flex-col ${
              colors[index % colors.length]
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">Order ID: {order._id}</h2>
            <p className="mb-1">Customer Email: {order.email}</p>
            {order.amount ? (
              <p className="mb-1">Amount: ${order.amount.toFixed(2)}</p>
            ) : (
              <p className="mb-1">Amount: N/A</p>
            )}
            <p className="mb-1">Payment Status: {order.paymentStatus}</p>
            <p className="mb-1">Current Status: {order.status}</p>
            <p className="mb-4 text-sm text-gray-500">
              Created At: {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mb-4">
              <label className="text-gray-700 font-semibold">
                Update Status:
              </label>
              <select
                className="w-full mt-2 p-2 rounded border"
                value={order.status}
                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
              >
                <option>Payment Successfull</option>
                <option>Pending</option>
                <option>Ready for Delivery</option>
                <option>Out for Delivery</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <button
              onClick={() => handleDeleteOrder(order._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition mt-auto"
            >
              Delete Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOrders;
