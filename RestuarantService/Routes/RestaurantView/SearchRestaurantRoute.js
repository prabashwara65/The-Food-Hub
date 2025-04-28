const express = require("express");
const router = express.Router();
const {getMenusByRestaurantID,  getRestaurantById, searchRestaurantsByName} = require("../../Controller/RestaurantView/RestaurantView")

// The searchRestaurantsByName 
router.get("/searchRestaurants", searchRestaurantsByName);

// The getMenusByRestaurantID 
router.get("/byRestaurant/:restaurantId", getMenusByRestaurantID);

// The getRestaurantById -  restaurant details 
router.get("/:id", getRestaurantById);


module.exports = router;
