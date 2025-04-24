import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar";

const OrderHome = () => {

    const [orders , setOrders] = useState([])

    useEffect(() => {
        const fecthOrders = async () => {
            const orders = await fetch('http://localhost:4000/api/order/getOrders')
            const data = await orders.json()
            setOrders(data)
        }
        fecthOrders()
    },[orders])

  return (
    <div className="container bg-teal-200 min-h-screen ">
      <Navbar />
      <div className="container flex flex-row gap-5 p-5">
        <div className="overflow-auto bg-amber-300 w-1/3 h-[30rem]">
            {orders.map((order)=>(
                <div className="flex flex-col m-4 text-xl h-16 rounded-2xl bg-white p-2 truncate overflow-hidden" key={order._id}> {order.status}</div>
            ))}
                
        </div>
        <div className="bg-orange-300 w-2/3">
                fsdfs
        </div>
      </div>
    </div>
  );
};

export default OrderHome;
