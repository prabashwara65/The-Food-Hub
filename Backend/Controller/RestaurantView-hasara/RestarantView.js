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

module.exports = { getMenusByRestaurantID };