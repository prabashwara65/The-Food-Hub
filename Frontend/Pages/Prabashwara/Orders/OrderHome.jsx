import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar";
import SingleOrder from "./SingleOrder";
import { useSelector } from "react-redux";

const OrderHome = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // selected order

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/order/getOrders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleClick = (order) => {
    setSelectedOrder(order); // pass full order to selectedOrder
    console.log("Selected Order:", order);
  };

  return (
    <div className="container min-h-screen">
      <Navbar />
      <div className="container flex flex-row gap-5 p-5">
        {/* Left Side - Order List */}
        <div className="overflow-auto bg-amber-300 w-1/3 h-[30rem] rounded-2xl p-4">
          {orders
            .filter((order) => order.email === user?.email) // only show logged-in user's orders
            .map((order) => (
              <div key={order._id} className="p-4 cursor-pointer hover:bg-amber-200 rounded-xl" onClick={() => handleClick(order)}>
                <h3>Order ID: {order._id}</h3>
                <p>Email: {order.email}</p>
                <p>Total: Rs {order.amount}</p>
                <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>

                <h4>Items:</h4>
                <ul className="list-disc ml-5">
                  {order.items.map((item) => (
                    <li key={item.menuId}>
                      {item.menuTitle} - Qty: {item.quantity} - Rs {item.price}
                    </li>
                  ))}
                </ul>
                <hr className="my-2" />
              </div>
            ))}
        </div>

        {/* Right Side - Single Order View */}
        <div className="bg-orange-300 w-2/3 rounded-3xl p-6 overflow-auto h-[30rem]">
          {selectedOrder ? (
            <SingleOrder order={selectedOrder} />
          ) : (
            <div className="text-center text-xl text-gray-600">
              Select an order to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHome;
