import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { clearUser } from '../../ReduxToolKit/userSlice';
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const user = useSelector((state) => state.user.user)
  //search bar
  const [searchQuery, setSearchQuery] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const navigate = useNavigate();


  //fetch restaurants
  useEffect(() => {
    const fetchRestaurants = async() => {
      const data = [
        { id: 1, name: "Pizza Paradise" },
        { id: 2, name: "Burger Haven" },
        { id: 3, name: "Sushi World" },
        { id: 4, name: "Taco Town" },
        { id: "RI-0001", name: "Mew Mew" },
      ]
      setRestaurants(data)
    }
    fetchRestaurants()
  }, [])

  //filter restaurnt 
  useEffect(() => {
    if(searchQuery.trim() == ""){
      setFilteredRestaurants([])
    }else {
      const filtered = restaurants.filter((restaurant) => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredRestaurants(filtered)
    }
  }, [searchQuery,restaurants])
 
  //re-direct
  const handleRestaurantClick = (id) => {
    navigate(`/restaurant/${id}`)
  }

  return (
    <div>
      <h1 className="text-xl">Home</h1>
      <div className="bg-red-500  p-4">{user.email}</div>

        {/* Search Bar */}
        <div className="relative mt-5">
        <div className="flex items-center border rounded p-2 w-full max-w-md  bg-gray-100 ml-4">
          <Search className="text-gray-400 mr-2" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a restaurant..."
            className="bg-transparent outline-none w-full"
          />
        </div>

        {/* Search Results */}
        {filteredRestaurants.length > 0 && (
          <ul className="absolute bg-white border rounded shadow-md w-full max-w-md  ml-4 text-sm border-b-gray-500">
            {filteredRestaurants.map((restaurant) => (
              <li
                key={restaurant.id}
                className="p-1 hover:bg-gray-200 cursor-pointer text-gray-400"
                onClick={() => handleRestaurantClick(restaurant.id)} >
                {restaurant.name}
              </li>
            ))}
          </ul>
        )}
      </div>


      <h1>Home must have Hero Section</h1>
      <h1>Home must have Grid View</h1>
      <h1>Home must have footer</h1>
    </div>
  );
};

export default Home;
