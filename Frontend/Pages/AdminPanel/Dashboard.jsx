import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import {
  ChevronFirst,
  ChevronLast,
  Home,
  Settings,
  LogOut,
  LayoutDashboard,
  User,
  Utensils,
  ClipboardList,
  Users,
  DollarSign,
  BarChart,
} from "lucide-react";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const Location = useLocation();

  //   return (
  //     <aside
  //       className={`h-screen transition-all duration-300 ${
  //         isCollapsed ? "w-16" : "w-64"
  //       } border border-gray-200 shadow-lg`}
  //     >
  //       <nav className="h-full flex flex-col bg-white">
  //         {/* Logo and Toggle Button */}
  //         <div className="p-3 pb-2 flex justify-between items-center border-b border-gray-100">
  //           <img
  //             src={logo}
  //             alt="logo"
  //             className={`w-20 transition-all ${
  //               isCollapsed ? "hidden" : "block"
  //             }`}
  //           />
  //           {!isCollapsed && (
  //             <h3 className="text-lg font-bold text-gray-700">The Food Hub</h3>
  //           )}
  //           <button
  //             onClick={() => setIsCollapsed(!isCollapsed)}
  //             className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
  //           >
  //             {isCollapsed ? <ChevronLast /> : <ChevronFirst />}
  //           </button>
  //         </div>

  //         {/* Navigation Menu */}
  //         <ul className="flex-1 px-3 space-y-2">
  //           <NavItem
  //             icon={<Home size={20} />}
  //             label="Home"
  //             isCollapsed={isCollapsed}
  //           />
  //           <NavItem
  //             icon={<LayoutDashboard size={20} />}
  //             label="Dashboard"
  //             isCollapsed={isCollapsed}
  //           />
  //           <NavItem
  //             icon={<Utensils size={20} />}
  //             label="Manage Restaurants"
  //             isCollapsed={isCollapsed}
  //           />
  //           <NavItem
  //             icon={<ClipboardList size={20} />}
  //             label="Manage Orders"
  //             isCollapsed={isCollapsed}
  //           />
  //           <NavItem
  //             icon={<Users size={20} />}
  //             label="User Management"
  //             isCollapsed={isCollapsed}
  //           />
  //           <NavItem
  //             icon={<BarChart size={20} />}
  //             label="Reports & Analytics"
  //             isCollapsed={isCollapsed}
  //           />
  //           <NavItem
  //             icon={<DollarSign size={20} />}
  //             label="Financial Transactions"
  //             isCollapsed={isCollapsed}
  //           />
  //           <NavItem
  //             icon={<Settings size={20} />}
  //             label="Settings"
  //             isCollapsed={isCollapsed}
  //           />
  //           <NavItem
  //             icon={<LogOut size={20} />}
  //             label="Logout"
  //             isCollapsed={isCollapsed}
  //           />
  //         </ul>

  //         {/* User Profile Section */}
  //         <div className="border-t border-gray-200 flex items-center p-3">
  //           <User size={20} className="text-gray-500" />
  //           {!isCollapsed && (
  //             <span className="ml-3 font-medium text-gray-700">John Doe</span>
  //           )}
  //         </div>
  //       </nav>
  //     </aside>
  //   );
  // };

  const navItems = [
    { label: "Home", icon: <Home size={20} />, path: "/admin/home" },
    { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    {
      label: "Manage Restaurants",
      icon: <Utensils size={20} />,
      path: "/admin/manage-restaurant",
    },
    { label: "Manage Orders", icon: <ClipboardList size={20} />, path: "#" },
    { label: "User Management", icon: <Users size={20} />, path: "#" },
    { label: "Reports & Analytics", icon: <BarChart size={20} />, path: "#" },
    {
      label: "Financial Transactions",
      icon: <DollarSign size={20} />,
      path: "#",
    },
    { label: "Settings", icon: <Settings size={20} />, path: "#" },
    { label: "Logout", icon: <LogOut size={20} />, path: "#" },
  ];

  /** Navigation Item Component */
  // const NavItem = ({ icon, label, isCollapsed }) => (
  //   <li className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition text-gray-700">
  //     {icon}
  //     {!isCollapsed && <span className="font-medium">{label}</span>}
  //   </li>
  // );

  return (
    <aside
      className={`h-screen transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } border border-gray-200 shadow-lg`}
    >
      <nav className="h-full flex flex-col bg-white">
        <div className="p-3 pb-2 flex justify-between items-center border-b border-gray-100">
          <img
            src={logo}
            alt="logo"
            className={`w-20 transition-all ${
              isCollapsed ? "hidden" : "block"
            }`}
          />
          {!isCollapsed && (
            <h3 className="text-lg font-bold text-gray-700">The Food Hub</h3>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
          >
            {isCollapsed ? <ChevronLast /> : <ChevronFirst />}
          </button>
        </div>

        <ul className="flex-1 px-3 space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isCollapsed={isCollapsed}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            />
          ))}
        </ul>

        <div className="border-t border-gray-200 flex items-center p-3">
          <User size={20} className="text-gray-500" />
          {!isCollapsed && (
            <span className="ml-3 font-medium text-gray-700">John Doe</span>
          )}
        </div>
      </nav>
    </aside>
  );
};

const NavItem = ({ icon, label, isCollapsed, active, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition text-gray-700 hover:bg-gray-100 ${
      active ? "bg-gray-200 font-semibold" : ""
    }`}
  >
    {icon}
    {!isCollapsed && <span>{label}</span>}
  </li>
);
export default Dashboard;
