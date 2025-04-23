import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUser } from "../../ReduxToolKit/userSlice";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";
import SearchBar from "../../Components/SearchBar";
import {Link} from "react-router-dom";

const Home = () => {
  //for search function (hasara)
  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]); 
  const [notFound, setNotFound] = useState(false); 

  const user = useSelector((state) => state.user.user);

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

  return (
    <div className="min-h-screen bg-linear-to-r from-[#E3E5E6] from-10% via-[#EDECE3] via-65% to-[#F6EFC8] to-90%">
      <Navbar />
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

        <div className="container mx-auto flex flex-row mt-25 gap-7">
          {/* Card 1 */}
          <div className="relative flex flex-1/4 h-50 bg-[#FFFFFF] rounded-3xl shadow-xl">
            <div className="absolute top-[-50px] left-23 w-30 h-30 rounded-full bg-red-200 "></div>
            <div className="absolute w-30 h-38 bottom-0 p-4 pt-8 ">
              {/* Rating */}
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 pt-1 fill-[#AE859B] text-[#AE859B]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <p className="text-md pl-1 text-[#AE859B]">4.7</p>
              </div>

              <p className="w-2xs pt-4 pl-1">
                Special <span className="block">Chiken rice Bowl</span>{" "}
              </p>
              {/* Price */}
            </div>
            <div className="absolute flex justify-center items-center w-11 h-11 bottom-8 right-5 bg-[#AE859B] rounded-full text-sm text-white font-medium">
              250
            </div>
          </div>
          {/* Card 2 */}
          <div className="relative flex flex-1/4 h-50 bg-[#FFFFFF] rounded-3xl shadow-xl">
            <div className="absolute top-[-50px] left-23 w-30 h-30 rounded-full bg-red-200"></div>
            <div className="absolute w-30 h-38 bottom-0 p-4 pt-8">
              {/* Rating */}
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 pt-1 fill-[#AE859B] text-[#AE859B]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <p className="text-md pl-1 text-[#AE859B]">4.7</p>
              </div>

              <p className="w-2xs pt-4 pl-1">
                Special <span className="block">Chiken rice Bowl</span>{" "}
              </p>
              {/* Price */}
            </div>
            <div className="absolute flex justify-center items-center w-11 h-11 bottom-8 right-5 bg-[#AE859B] rounded-full text-sm text-white font-medium">
              250
            </div>
          </div>
          {/* Card 3 */}
          <div className="relative flex flex-1/4 h-50 bg-[#FFFFFF] rounded-3xl shadow-xl">
            <div className="absolute top-[-50px] left-23 w-30 h-30 rounded-full bg-red-200"></div>
            <div className="absolute w-30 h-38 bottom-0 p-4 pt-8">
              {/* Rating */}
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 pt-1 fill-[#AE859B] text-[#AE859B]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <p className="text-md pl-1 text-[#AE859B]">4.7</p>
              </div>

              <p className="w-2xs pt-4 pl-1">
                Special <span className="block">Chiken rice Bowl</span>{" "}
              </p>
              {/* Price */}
            </div>
            <div className="absolute flex justify-center items-center w-11 h-11 bottom-8 right-5 bg-[#AE859B] rounded-full text-sm text-white font-medium">
              250
            </div>
          </div>
          {/* Card 4 */}
          <div className="relative flex flex-1/4 h-50 bg-[#FFFFFF] rounded-3xl shadow-xl">
            <div className="absolute top-[-50px] left-23 w-30 h-30 rounded-full bg-red-200"></div>
            <div className="absolute w-30 h-38 bottom-0 p-4 pt-8">
              {/* Rating */}
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-5 pt-1 fill-[#AE859B] text-[#AE859B]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <p className="text-md pl-1 text-[#AE859B]">4.7</p>
              </div>

              <p className="w-2xs pt-4 pl-1">
                Special <span className="block">Chiken rice Bowl</span>{" "}
              </p>
              {/* Price */}
            </div>
            <div className="absolute flex justify-center items-center w-11 h-11 bottom-8 right-5 bg-[#AE859B] rounded-full text-sm text-white font-medium">
              250
            </div>
          </div>
        </div>

        {/* 3rd container */}
        <div className="container flex mx-auto justify-between mt-15 gap-5">
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
          <div className="flex flex-1/3 bg-green-300">
            <div className="w-full bg-red-200">ds</div>
            
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
