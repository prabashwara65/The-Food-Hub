const mongoose = require('mongoose')
// const Restaurant = require('../../models/Restaurant')

const restaurantList =[
  { restaurantId: 1, name: "Sushi Palace" },
  { restaurantId: 2, name: "Bella Pasta" },
  { restaurantId: 3, name: "Green Garden" },
  { restaurantId: 4, name: "Chicken House" },
  {restaurantId : "RI-0001", name: "Mew Mew"}
]

const searchRestaurantsByName = async (req, res) => {
    const {name} = req.query;

    if(!name || name.trim() === "") {
        return res.status(400).json({ message: "Search query is required." });   
    }

    const filtered = restaurantList.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(name.toLowerCase())
      );

      return res.status(200).json(filtered);
}

module.exports = {searchRestaurantsByName}

