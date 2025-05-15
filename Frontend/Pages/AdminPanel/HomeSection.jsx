import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const HomeSection = () => {
  const [counts, setCounts] = useState({
    customer: 0,
    owner: 0,
    delivery: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get(
          "http://foodhub.local:30000/api/auth/user-counts"
        );

        setCounts({
          customer: res.data.customers,
          owner: res.data.owners,
          delivery: res.data.deliveryPersons,
        });
      } catch (err) {
        console.error("Failed to fetch user accounts", err);
      }
    };

    fetchCounts();
  }, []);

  const navigate = useNavigate();

  const cardData = [
    {
      title: "Customer",
      description: "Manage customer data and activities.",
      count: counts.customer,
      bgColor: "bg-blue-100",
      onClick: () => navigate("/admin/customers"),
    },
    {
      title: "Restaurant Owner",
      description: "Manage restaurants and owners.",
      count: counts.owner,
      bgColor: "bg-green-100",
      onClick: () => navigate("/admin/owners"),
    },
    {
      title: "Delivery Person",
      description: "Manage delivery team and assignments.",
      count: counts.delivery,
      bgColor: "bg-yellow-100",
      onClick: () => navigate("/admin/delivery"),
    },
  ];

  return (
    <div className="p-6 flex flex-row justify-around gap-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          onClick={card.onClick}
          className={`cursor-pointer w-64 p-4 rounded-xl shadow-md hover:shadow-lg transition-all ${card.bgColor}`}
        >
          <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
          <p className="text-sm text-gray-700">{card.description}</p>
          <p className="text-2xl font-bold text-gray-800">{card.count}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeSection;
