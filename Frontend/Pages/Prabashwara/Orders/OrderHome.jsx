import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar";
import SingleOrder from "./SingleOrder";
import { useSelector } from "react-redux";

const OrderHome = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://foodhub.local:4003/api/order/getOrders");
        const data = await response.json();
        console.log(data)
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleClick = (order) => {
    setSelectedOrder(order);
    console.log("Selected Order:", order);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-orange-200">
      <Navbar />
      <div className="container mx-auto flex flex-col md:flex-row gap-6 p-6">
        
        {/* Left Side - Order List */}
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full md:w-1/3 overflow-y-auto h-[32rem]">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Your Orders</h2>
          {orders
            .filter((order) => order.email === user?.email)
            .map((order) => (
              <div 
                key={order._id} 
                className={`p-4 mb-4 rounded-xl border hover:shadow-md cursor-pointer transition 
                  ${selectedOrder?._id === order._id ? 'bg-orange-100 border-orange-400' : 'bg-gray-50 border-gray-200'}`}
                onClick={() => handleClick(order)}
              >
                <h3 className="font-semibold text-lg text-gray-800">Order #{order._id.slice(-6)}</h3>
                <p className="text-sm text-gray-600">Email: {order.email}</p>
                <p className="text-sm text-gray-600">Total: <span className="font-semibold">Rs {order.amount}</span></p>
                <p className="text-xs text-gray-500">Created: {new Date(order.createdAt).toLocaleString()}</p>

                <div className="mt-2">
                  <h4 className="text-sm font-semibold mb-1">Items:</h4>
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    {order.items.map((item) => (
                      <li key={item.menuId}>
                        {item.menuTitle} × {item.quantity} - Rs {item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>

        {/* Right Side - Single Order View */}
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full md:w-2/3 overflow-y-auto h-[32rem] flex items-center justify-center">
          {selectedOrder ? (
            <SingleOrder order={selectedOrder} items={selectedOrder.items} />

          ) : (
            <div className="text-center text-2xl text-gray-500 animate-pulse">
              Select an order to view details
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrderHome;
