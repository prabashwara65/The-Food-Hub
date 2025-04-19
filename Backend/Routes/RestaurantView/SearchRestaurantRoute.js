const express = require("express");
const router = express.Router();
const { searchRestaurantsByName } = require("../../Controller/RestaurantView-hasara/SearchRestaurant");
const {getMenusByRestaurantID} = require("../../Controller/RestaurantView-hasara/RestarantView")

router.get("/searchRestaurants", searchRestaurantsByName);

// The getMenusByRestaurantID (Restaurant View Controller)
router.get("/byRestaurant/:restaurantId", getMenusByRestaurantID);


module.exports = router;
