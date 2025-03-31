import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { clearUser } from '../../ReduxToolKit/userSlice';
import { Search } from 'lucide-react'

const Home = () => {
  const user = useSelector((state) => state.user.user)
  //search bar
  const [searchQuery, setSearchQuery] = useState('')
  const [restaurants, setRestaurants] = useState([])
  const [filteredRestaurants, setFilteredRestaurants] = useState([])


  //fetch restaurants
  useEffect(() => {
    const fetchRestaurants = async() => {

      const data = [
        { id: 1, name: "Pizza Paradise" },
        { id: 2, name: "Burger Haven" },
        { id: 3, name: "Sushi World" },
        { id: 4, name: "Taco Town" },
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


  return (
    <div>
      <h1 className="text-xl">Home</h1>
      <div className="bg-red-500  p-4">{user.email}</div>


      <h1>Home must have SearchBar</h1>
        {/* Search Bar */}
        <div className="relative">
        <div className="flex items-center border rounded p-2 w-full max-w-md mb-4 bg-gray-100 ml-4">
          <Search className="text-gray-500 mr-2" size={20} />
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
          <ul className="absolute bg-white border rounded shadow-md w-full max-w-md mt-1 ml-4">
            {filteredRestaurants.map((restaurant) => (
              <li
                key={restaurant.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => alert(`Restaurant ID: ${restaurant.id}`)} >
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
