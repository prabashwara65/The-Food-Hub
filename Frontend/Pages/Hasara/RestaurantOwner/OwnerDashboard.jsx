import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';
import Menu from '../Menu/MenuDashboard';
import { useSelector } from 'react-redux';

const OwnerDashboard = () => {
  const [activePage, setActivePage] = useState('Menu'); 
  const [restaurantId, setRestaurantId] = useState(null);

  const owner = useSelector((state) => state.owner.owner);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        if (owner?.name) {
          const response = await fetch(`http://foodhub.local:4004/api/restaurant/getByOwnerName?ownerName=${owner.name}`);
          if (!response.ok) {
            throw new Error('Failed to fetch restaurant');
          }
          const data = await response.json();
          setRestaurantId(data.restaurantId);
        }
      } catch (error) {
        console.error("Error fetching restaurant", error);
      }
    };
  
    fetchRestaurant();
  }, [owner]);

  return (
    <div className="flex h-screen">
      <SideBar setActivePage={setActivePage} />
      <div className="flex-1 p-6">
        <h4 className="text-lg font-bold mb-5">Welcome to {owner?.name || "Mew Mew"}</h4>
        <div className="bg-orange-100 shadow-lg rounded-lg p-6 flex-grow mb-5">
          {activePage === "Dashboard" && (
            <h2 className="text-xl font-semibold">
              Welcome to Dashboard
            </h2>
          )}
          {activePage === "Menu" && restaurantId && (
            <Menu restaurantId={restaurantId} />
          )}
          {activePage === "Order" && (
            <h2 className="text-xl font-semibold">Order Management</h2>
          )}
          {activePage === "Settings" && (
            <h2 className="text-xl font-semibold">Settings</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
