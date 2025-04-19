const express = require("express");
const router = express.Router();
const { searchRestaurantsByName } = require("../../Controller/RestaurantView-hasara/SearchRestaurant");

router.get("/searchRestaurants", searchRestaurantsByName);

module.exports = router;
