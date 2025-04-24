import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../../ReduxToolKit/userSlice";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import SearchBar from "../../Components/SearchBar";
import HomeCard from "../../Components/HomeCard"

import { Link } from "react-router-dom";
// import { clearUser } from '../../ReduxToolKit/userSlice'
import toast from "react-hot-toast";

const Home = () => {
  //for search function (hasara)
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]); 
  const [notFound, setNotFound] = useState(false); 
  const [menus, setMenus] = useState([]);

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

 useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if(searchQuery.trim() === "") {
      setRestaurants([]);
      setNotFound(false)
      return;
    }

    fetch(`http://localhost:4000/api/restaurantView/searchRestaurants?name=${searchQuery}`)
    .then((res) => res.json())
    .then((data) => {
      if(data.length === 0){
        setNotFound(true);
      }else {
        setNotFound(false);
      }
      setRestaurants(data);
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      setRestaurants([]);
      setNotFound(true);
    })
  }, 500); //debounce delay

  return () => clearTimeout(delayDebounce); //cleanup function
 }, [searchQuery]);

  
 useEffect(() => {
   const fetchMenus = async () => {
     try {
       const response = await fetch("http://localhost:4000/api/menu/menus/RI-0001");
       console.log(response)
       
       if (!response.ok) throw new Error("Failed to fetch menus");

       const json = await response.json();
       setMenus(json);
     } catch (error) {
       toast.error("Error fetching menu data.");
       console.error("Fetch Error:", error);
     }
   };

   fetchMenus();
 }, []);

 const handleLogOut = () => {
  dispatch(clearUser())
  console.log("account cleared")
  
 }
 

  return (
    <div>
      <div className="min-h-screen px-12 bg-linear-to-r from-[#E3E5E6] from-10% via-[#EDECE3] via-65% to-[#F6EFC8] to-90%">
      <Navbar onHandleLogOut={handleLogOut}/>
      <div className="h-full mx-auto">
        <div className="container flex mx-auto py-8 justify-between items-end ">
          {/* Search bar */}
          <div className="w-full max-w-2xl ml-5">
          <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>

            <div className="mt-2 max-h-40 overflow-y-auto ">
              {notFound ? (
                <p className="text-gray-600 bg-white p-1 rounded shadow mb-3">No such restaurant found.</p>
              ) : (
                restaurants.map((restaurant, index) => (
                  <Link to={`/restaurant/${restaurant.restaurantId}`} key={index}>
                     <div className="bg-white p-1 rounded shadow mb-2 hover:bg-gray-100 cursor-pointer">
                      {restaurant.name}
                    </div>
                  </Link>
                ))
              )}
            </div>
            </div>

          {/* +Add order Button */}
          <button className="ml-8 rounded-3xl p-3 text-white bg-[#B97A9E] font-extralight">
            + Add Order
          </button>
        </div>

        {/* Banner */}
        <div className="container relative mx-auto bg-[#F3B734] py-9 pl-3 h-[250px] rounded-3xl">
          <div className="block w-md pl-5">
            <span className="font-bold uppercase">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              tempore aspernatur
            </span>
            <p className="block py-5">
              explicabo illum quidem, repellat fugiat accusamus! Vero quia
              nostrum consectetur aspernatur deleniti!
            </p>
            <button className="rounded-4xl p-4 uppercase bg-[#745200] text-white w-[200px]">
              Read More
            </button>
          </div>
          <img
            src="/foodman.png"
            alt="foodman"
            className="absolute w-[20rem] right-10 top-[-40px] -rotate-12"
          />
        </div>

        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {menus.map((menu) => (
          <HomeCard key={menu._id} menu={menu}  />
        ))}
        </div>

       
        {/* 3rd container */}
        <div className="container p-8 flex mx-auto justify-between mt-15 gap-5">
          {/* First Card */}
          <div className="flex flex-1/4">
            <div className="flex flex-col w-40 h-40 items-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 p-1 rounded-full bg-[#48AAF5] font-medium "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <p className="font-medium pt-3">Semms</p>
              <p className="font-extralight">Marketing</p>
            </div>
            <div className="flex flex-col w-40 h-40 items-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 p-1 rounded-full bg-[#24BBA1] font-medium "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <p className="font-medium pt-3">Minto</p>
              <p className="font-extralight">Suppliers</p>
            </div>
            <div className="flex flex-col w-40 h-40 items-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 p-1 rounded-full bg-[#DBA800] font-medium"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <p className="font-medium pt-3">Alia</p>
              <p className="font-extralight">Accounting</p>
            </div>
          </div>

          {/* Second bottom card */}
          <div className="flex flex-1/3 bg-[#FFFFFF] rounded-2xl ">
            
              <div className="flex flex-col w-30 h-30 items-center p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8  rounded-full bg-amber-200  "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <p className="font-medium pt-3">Minto</p>
                <p className="font-extralight">Suppliers</p>
              </div>
            
          </div>

          {/* Third bottom card */}
          <div className="flex flex-1/3 bg-[#FFFFFF] rounded-2xl ">
            
              <div className="flex flex-col w-30 h-30 items-center p-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8  rounded-full bg-amber-200  "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <p className="font-medium pt-3">Minto</p>
                <p className="font-extralight">Suppliers</p>
              </div>
            
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
    
  );
};

export default Home;
