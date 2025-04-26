import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar";
import SingleOrder from "./SingleOrder";

const OrderHome = () => {
  const [orders, setOrders] = useState([]);
  const [oneOrder, setOneOrder] = useState([])
 

  useEffect(() => {
    const fecthOrders = async () => {
      const orders = await fetch("http://localhost:4000/api/order/getOrders");
      const data = await orders.json();
      setOrders(data);

      console.log(data);
    };
    fecthOrders();
  }, []);

  const handelClick = (id) => {
    console.log(`card has pressed  + ${id}`);
  };


  useEffect(() => {
    const getOneOrder = async (req , res) => {
      const response = await fetch("http://localhost:4000/api/order/getOrders")
      const data = response.json
      setOneOrder(data)
    }
    getOneOrder()
  },[])



  return (
    <div className="container min-h-screen ">
      <Navbar />
      <div className="container flex flex-row gap-5 p-5 ">
        <div className="overflow-auto bg-amber-300 w-1/3 h-[30rem] rounded-2xl p-4">
          {orders.map((order) => (
            <div key={order._id} className="p-4" onClick={() => handelClick(order._id)}>
              <h3>Order ID: {order._id}</h3>
              <p>Email: {order.email}</p>
              <p>Total: Rs {order.amount}</p>
              {/* <p>Status: {order.status}</p> */}
              <p>Created At: {new Date(order.createdAt).toLocaleString()}</p>

              <h4>Items:</h4>
              <ul>
                {order.items.map((item) => (
                  <li key={item.menuId}>
                    {item.menuTitle} - Quantity: {item.quantity} - Price: Rs 
                    {item.price}
                  </li>
                ))}
              </ul>
              <hr />
            </div>
          ))}
        </div>
        <div className="bg-orange-300 w-2/3 rounded-3xl">
        {/* <SingleOrder id={order._id}/> */}
        
        </div>
      </div>
    </div>
  );
};

export default OrderHome;
