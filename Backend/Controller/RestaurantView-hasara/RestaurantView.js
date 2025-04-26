const Menu = require("../../Model/Menu/MenuModel");
const Restaurant = require("../../Model/Restaurant/RestaurantModel")

const getMenusByRestaurantID = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const menus = await Menu.find({ restaurantId });
    res.status(200).json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//fetch restaurant details according to restaurantId
const getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    const restaurant = await Restaurant.findOne({ restaurantId: id });

    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({ message: "Restaurant not found" });
    }
  } catch (error) {
    console.error('Error fetching restaurant by ID:', error);
    res.status(500).json({ message: "Server error while fetching restaurant." });
  }
};

module.exports = { getMenusByRestaurantID, getRestaurantById };