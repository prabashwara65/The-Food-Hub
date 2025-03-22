import React from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../ReduxToolKit/userSlice';

const Home = () => {
  const user = useSelector((state) => state.user.user)
  return (
    <div>
      <h1 className="text-xl">Home</h1>
      <div className="bg-red-500  p-4">{user.email}</div>
    </div>
  );
};

export default Home;
