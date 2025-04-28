const Menu = require("../../Model/Menu/MenuModel");

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
const restaurants = [
  {
    id: "1",
    name: "Spice Garden",
    location: "Colombo",
    mobile: "0718111334",
  },
  {
    id: "3",
    name: "Ocean Breeze",
    location: "Galle",
    mobile: "0718111334",
  },
  {
    id: "RI-0001",
    name: "Mew Mew",
    location: "Athurugiriya, Sri Lanka",
    mobile: "071-8111334",
  },
];

const getRestaurantById = (req, res) => {
  const { id } = req.params;
  const restaurant = restaurants.find((r) => r.id === id);

  if (restaurant) {
    res.status(200).json(restaurant);
  } else {
    res.status(404).json({ message: "Restaurant not found" });
  }
};

module.exports = { getMenusByRestaurantID, getRestaurantById };