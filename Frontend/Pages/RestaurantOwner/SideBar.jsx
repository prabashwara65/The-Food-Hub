import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import { ChevronFirst, ChevronLast, Home, Settings, LogOut, LayoutDashboard, User } from "lucide-react";

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} border border-gray-200 shadow-lg`}>
      <nav className="h-full flex flex-col bg-white">
        {/* Logo and Toggle Button */}
        <div className="p-3 pb-2 flex justify-between items-center border-b border-gray-100">
          <img src={logo} alt="logo" className={`w-20 transition-all ${isCollapsed ? 'hidden' : 'block'}`} />
          {!isCollapsed && <h3 className="text-lg font-semibold text-gray-700">The Food Hub</h3>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition'
          >
            {isCollapsed ? <ChevronLast /> : <ChevronFirst />}
          </button>
        </div>

        {/* Navigation Menu */}
        <ul className='flex-1 px-3 space-y-2'>
          <NavItem icon={<Home size={20} />} label="Home" isCollapsed={isCollapsed} />
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" isCollapsed={isCollapsed} />
          <NavItem icon={<Settings size={20} />} label="Settings" isCollapsed={isCollapsed} />
          <NavItem icon={<LogOut size={20} />} label="Logout" isCollapsed={isCollapsed} />
        </ul>

        {/* User Profile Section */}
        <div className='border-t border-gray-200 flex items-center p-3'>
          <User size={20} className="text-gray-500" />
          {!isCollapsed && <span className='ml-3 font-medium text-gray-700'>John Doe</span>}
        </div>
      </nav>
    </aside>
  );
};

/** Navigation Item Component */
const NavItem = ({ icon, label, isCollapsed }) => (
  <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition text-gray-700">
    {icon}
    {!isCollapsed && <span className="font-medium">{label}</span>}
  </li>
);

export default SideBar;
