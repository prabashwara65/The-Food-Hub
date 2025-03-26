import React, { useState } from 'react';
import SideBar from './SideBar';
import Menu from '../Menu/MenuDashboard';

const OwnerDashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard'); 

  return (
    <div className="flex h-screen">
      <SideBar setActivePage={setActivePage} />
      <div className="flex-1 p-6">
        <h4 className="text-lg font-bold mb-5">Welcome to Mew Mew</h4>
        <div className="bg-orange-100 shadow-lg rounded-lg p-6 flex-grow mb-5">
          {activePage === "Dashboard" && (
            <h2 className="text-xl font-semibold">
              Welcome to Mew Mew Dashboard
            </h2>
          )}
          {activePage === "Menu" && <Menu />}
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
