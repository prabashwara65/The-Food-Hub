import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearUser } from "../../ReduxToolKit/userSlice";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import SearchBar from "../../Components/SearchBar";
import HomeCard from "../../Components/HomeCard"
import EasyPayment from '../../assets/images/easy_payment.png';
import FastDelivery from '../../assets/images/fast_delivery.png';
import TopRestaurants from '../../assets/images/top_res.png';
import TrustedService from '../../assets/images/trust_service.png';

import { Link } from "react-router-dom";
// import { clearUser } from '../../ReduxToolKit/userSlice'
import toast from "react-hot-toast";

const Home = () => {
  //for search function (hasara)
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]); 
  const [notFound, setNotFound] = useState(false); 
  const [menus, setMenus] = useState([]);

  
  const dispatch = useDispatch();

 useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if(searchQuery.trim() === "") {
      setRestaurants([]);
      setNotFound(false)
      return;
    }

    fetch(`http://foodhub.local:30004/api/restaurantView/searchRestaurants?name=${searchQuery}`)
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
       const response = await fetch("http://foodhub.local:30004/api/menu/menus/RI-0001");
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

 const features = [
  {
    title: "Fast Delivery",
    description: "Get your food delivered in under 30 minutes.",
    icon: FastDelivery,
  },
  {
    title: "Top Restaurants",
    description: "Choose from a variety of high-rated restaurants.",
    icon: TopRestaurants,
  },
  {
    title: "Trusted Service",
    description: "Safe, hygienic, and reliable delivery experience.",
    icon: TrustedService,
  },
  {
    title: "Easy Payment",
    description: "Multiple payment options: cards, wallets, or cash. Fast, secure, and hassle-free checkout.",
    icon: EasyPayment,
  },
];
 
  return (
    <div>
      <div className="min-h-screen px-12 bg-linear-to-r from-[#E3E5E6] from-10% via-[#EDECE3] via-65% to-[#F6EFC8] to-90%">
        <Navbar onHandleLogOut={handleLogOut} />
        <div className="h-full mx-auto">
          <div className="container flex mx-auto py-8 justify-between items-end ">
            {/* Search bar */}
            <div className="w-full max-w-2xl ml-5">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <div className="mt-2 max-h-40 overflow-y-auto ">
                {notFound ? (
                  <p className="text-gray-600 bg-white p-1 rounded shadow mb-3">
                    No such restaurant found.
                  </p>
                ) : (
                  restaurants.map((restaurant, index) => (
                    <Link
                      to={`/restaurant/${restaurant.restaurantId}`}
                      key={index}
                    >
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
          <div className="container relative mx-auto bg-[#F3B734] py-9 pl-3 h-[300px] rounded-3xl">
            <div className="max-w-xl ml-5">
              <h2 className="text-2xl md:text-4xl font-bold uppercase text-[#4B3200]">
                Delicious Meals, Delivered Fast
              </h2>
              <p className="mt-4 text-gray-800 text-sm md:text-base">
                Satisfy your cravings with our seamless food delivery service.
                From local favorites to international dishes, enjoy fresh and
                hot meals delivered right to your door.
              </p>
              <button className="mt-6 px-6 py-3 bg-[#4B3200] text-white uppercase rounded-full hover:bg-[#362300] transition">
                Read More
              </button>
            </div>
            <img
              src="/foodman.png"
              alt="foodman"
              className="absolute w-[20rem] right-10 top-[-40px] -rotate-12"
            />
          </div>
          <div className="mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {menus.map((menu) => (
              <HomeCard key={menu._id} menu={menu} />
            ))}
          </div>
          {/* 3rd container */}
          {/* <div className="container p-8 flex mx-auto justify-between mt-15 gap-5"> */}
          {/* First Card
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
          {/* <div className="flex flex-1/3 bg-[#FFFFFF] rounded-2xl ">
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

            <div className="flex bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition duration-200 w-full">
              <div className="flex items-center space-x-4">
                {/* Supplier Avatar */}
          {/* <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-7 h-7 text-amber-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.1a7.5 7.5 0 0 1 15 0A17.93 17.93 0 0 1 12 21.75c-2.7 0-5.2-.6-7.5-1.65Z"
                    />
                  </svg>
                </div> */}
          {/* Supplier Info */}
          {/* <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Minto Fresh Supplies
                  </p>
                  <p className="text-sm text-gray-500">
                    Top-rated supplier this month
                  </p>
                  <p className="text-sm text-green-500 font-medium mt-1">
                    ✓ On-time 98% | 120 Orders
                  </p>
                </div> */}
          {/* </div>
            </div> */}
          {/* </div> */}
          <div className="container mx-auto mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition flex flex-col items-center text-center"
              >
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-20 h-20 mb-2"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
