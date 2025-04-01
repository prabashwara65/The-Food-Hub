import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetails = () => {
  const { id } = useParams(); // Get restaurant ID from URL
  const [restaurant, setRestaurant] = useState(null);

  // Fetch restaurant details (replace with API call)
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const mockData = {
        id: id,
        name: id === "1" ? "Pizza Paradise" : "Unknown Restaurant",
        menu: [
          { item: "Pepperoni Pizza", price: "$10" },
          { item: "Veggie Pizza", price: "$9" },
        ],
      };
      setRestaurant(mockData);
    };
    fetchRestaurantDetails();
  }, [id]);

  if (!restaurant) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{restaurant.name}</h1>
      <h2 className="mt-4 text-xl">Menu:</h2>
      <ul className="mt-2">
        {restaurant.menu.map((dish, index) => (
          <li key={index} className="p-2 border-b">
            {dish.item} - {dish.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetails;
