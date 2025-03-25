import React, { useState } from 'react';
import SideBar from './SideBar';

const OwnerDashboard = () => {
  const [activePage, setActivePage] = useState('Dashboard'); 

  return (
    <div className="flex h-screen">
      <SideBar setActivePage={setActivePage} />

      {/* Main Content */}
      <h4 className='text-lg font-bold p-5 mb-5'>Welcome to Mew Mew </h4>
      {/* add cover photo */}
      <div className="flex-1 p-6 mt-5">
        {activePage === 'Dashboard' && <h2 className="text-xl font-semibold">Welcome to Mew Mew Dashboard</h2>}
        {activePage === 'Menu' && <h2 className="text-xl font-semibold">Menu Management</h2>}
        {activePage === 'Order' && <h2 className="text-xl font-semibold">Order Management</h2>}
        {activePage === 'Settings' && <h2 className="text-xl font-semibold">Settings</h2>}
      </div>
    </div>
  );
};

export default OwnerDashboard;
