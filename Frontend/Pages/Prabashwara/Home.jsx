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
      <h1>Home must have SerchBard</h1>
      <h1>Home must have Hero Section</h1>
      <h1>Home must have Grid View</h1>
      <h1>Home must have footer</h1>
    </div>
  );
};

export default Home;
