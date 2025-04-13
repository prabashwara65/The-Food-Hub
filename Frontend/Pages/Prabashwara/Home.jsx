import React from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../ReduxToolKit/userSlice';

const Home = () => {
  const user = useSelector((state) => state.user.user)
  return (
    <div className="h-screen bg-[#F6F6FF]">

      {/* Search bar */}
      <div className="container items-center justify-center  bg-amber-800">
        <div>sfs</div>
      </div>
    </div>
  );
};

export default Home;
