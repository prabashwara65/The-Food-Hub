const RestaurantModel = require("../../Model/Restaurant/RestaurantModel");

const AddRestaurant = async (req, res) => {
  const { name, owner, email, telephone, address } = req.body;

  try {
    const restaurant = new RestaurantModel({
      name,
      owner,
      email,
      telephone,
      address,
    });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
};

const updateRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const updated = await RestaurantModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update restaurant" });
  }
};

const deleteRestaurant = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await RestaurantModel.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ message: "Restaurant not found" });
    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete restaurant" });
  }
};

module.exports = {
  AddRestaurant,
  GetRestaurants,
  updateRestaurant,
  deleteRestaurant,
};
