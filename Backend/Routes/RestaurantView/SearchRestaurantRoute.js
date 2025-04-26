const express = require("express");
const router = express.Router();
const {getMenusByRestaurantID,  getRestaurantById, searchRestaurantsByName} = require("../../Controller/RestaurantView-hasara/RestaurantView")

// The searchRestaurantsByName 
router.get("/searchRestaurants", searchRestaurantsByName);

// The getMenusByRestaurantID 
router.get("/byRestaurant/:restaurantId", getMenusByRestaurantID);

// The getRestaurantById -  restaurant details 
router.get("/:id", getRestaurantById);


module.exports = router;
