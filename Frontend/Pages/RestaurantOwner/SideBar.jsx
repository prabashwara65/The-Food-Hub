import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import { ChevronFirst, ChevronLast, SquareMenu, Settings, LogOut, LayoutDashboard, User, NotebookPen } from "lucide-react";

const SideBar = ({ setActivePage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`h-screen transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} border-r border-gray-200 shadow-xl`}>
      <nav className="h-full flex flex-col bg-white">
        
        {/* Logo & Toggle Button */}
        <div className="p-3 pb-2 flex justify-between items-center border-b border-gray-100">
          <img src={logo} alt="logo" className={`w-20 transition-all ${isCollapsed ? 'hidden' : 'block'}`} />
          {!isCollapsed && <h5 className="text-md font-bold text-gray-700 pr-2">The Food Hub</h5>}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)} 
            className="p-1.5 rounded-lg bg-orange-100 hover:bg-orange-300 transition"
          >
            {isCollapsed ? <ChevronLast /> : <ChevronFirst />}
          </button>
        </div>

        {/* Navigation Menu */}
        <ul className="flex-1 px-2 space-y-3 pt-5">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" isCollapsed={isCollapsed} setActivePage={setActivePage} />
          <NavItem icon={<SquareMenu size={20} />} label="Menu" isCollapsed={isCollapsed} setActivePage={setActivePage} />
          <NavItem icon={<NotebookPen size={20} />} label="Order" isCollapsed={isCollapsed} setActivePage={setActivePage} />
          <NavItem icon={<Settings size={20} />} label="Settings" isCollapsed={isCollapsed} setActivePage={setActivePage} />
          <NavItem icon={<LogOut size={20} />} label="Logout" isCollapsed={isCollapsed} setActivePage={setActivePage} />
        </ul>

        {/* User Profile Section */}
        <div className="border-t border-gray-200 flex items-center p-3 bg-orange-100 hover:bg-orange-300 m-3 rounded-lg cursor-pointer transition">
          <User size={20} className="text-black" />
          {!isCollapsed && <span className="ml-3 font-medium text-gray-700">John Doe</span>}
        </div>
      </nav>
    </aside>
  );
};

/** Navigation Item Component */
const NavItem = ({ icon, label, isCollapsed, setActivePage }) => (
  <li
    onClick={() => setActivePage(label)}
    className="flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition text-black font-bold text-md 
               hover:bg-orange-300 bg-orange-100"
  >
    {icon}
    {!isCollapsed && <span className="font-medium">{label}</span>}
  </li>
);

export default SideBar;
