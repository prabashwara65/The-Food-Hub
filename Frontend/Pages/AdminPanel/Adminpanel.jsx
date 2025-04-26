import React from "react";
import Dashboard from "./Dashboard";
import HomeSection from "./HomeSection";

const Adminpanel = () => {
  return (
    <div className="flex">
      <Dashboard />

      <div className="flex-1 bg-gray-50 min-h-screen p-4">
        <HomeSection />
      </div>
    </div>
  );
};

export default Adminpanel;
