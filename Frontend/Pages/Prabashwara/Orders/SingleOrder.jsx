import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SingleOrder = ({ order }) => {
  const [menuImages, setMenuImages] = useState({}); 

  useEffect(() => {
    const fetchMenuImages = async () => {
      if (!order?.items) return;

      const fetchedImages = {};

      // Fetch images for each item
      await Promise.all(order.items.map(async (item) => {
        try {
          const response = await fetch(`http://localhost:4003/api/menu/${item.menuId}`);
          const data = await response.json();
          fetchedImages[item.menuId] = data.photos?.[0] || null; // Take the first photo
        } catch (error) {
          console.error(`Error fetching image for menuId ${item.menuId}`, error);
          fetchedImages[item.menuId] = null;
        }
      }));

      setMenuImages(fetchedImages); 
    };

    fetchMenuImages();
  }, [order]);

  if (!order) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400 text-yellow-900";
      case "Processing":
        return "bg-blue-400 text-blue-900";
      case "Completed":
        return "bg-green-400 text-green-900";
      case "Cancelled":
        return "bg-red-400 text-red-900";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative p-8 bg-white rounded-3xl shadow-2xl w-full h-full overflow-y-auto"
    >
      {/* Top colored line */}
      <div className={`absolute top-0 left-0 w-full h-2 rounded-t-3xl ${getStatusColor(order.status).split(" ")[0]}`} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Order Details</h2>
        {/* Status badge */}
        <span className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div className="space-y-4 text-gray-700">
        <p><span className="font-semibold">Order ID:</span> #{order._id.slice(-6)}</p>
        <p><span className="font-semibold">Email:</span> {order.email}</p>
        <p><span className="font-semibold">Total:</span> Rs {order.amount}</p>
        <p><span className="font-semibold">Created At:</span> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">Items</h3>
        <ul className="space-y-4">
          {order.items.map((item) => (
            <li 
              key={item.menuId} 
              className="bg-gray-100 p-4 rounded-lg flex items-center justify-between hover:bg-gray-200 transition"
            >
              {/* Left side: image + title + quantity */}
              <div className="flex items-center gap-4">
                {/* Show menu image */}
                {menuImages[item.menuId] ? (
                  <img 
                    src={menuImages[item.menuId]} 
                    alt={item.menuTitle}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div>
                  <p className="font-medium">{item.menuTitle}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
              </div>

              {/* Right side: price */}
              <div className="font-bold text-gray-700">
                Rs {item.price}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default SingleOrder;
