const mongoose = require('mongoose')
const Restaurant = require('../../Model/Restaurant/RestaurantModel')

const searchRestaurantsByName = async (req, res) => {
  const { name } = req.query;

  if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Search query is required." });
  }

  try {
      const filteredRestaurants = await Restaurant.find({
          name: { $regex: name, $options: 'i' } 
      }).select('restaurantId name'); 

      return res.status(200).json(filteredRestaurants);
  } catch (error) {
      console.error('Error searching restaurants:', error);
      return res.status(500).json({ message: "Server error while searching restaurants." });
  }
};

module.exports = {searchRestaurantsByName}

