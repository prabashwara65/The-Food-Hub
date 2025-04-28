const express = require("express");

const {
  AddRestaurant,
  GetRestaurants,
  updateRestaurant,
  deleteRestaurant,
  getRestaurantByOwnerName
} = require("../../Controller/Restaurant/RestaurantController");

const router = express.Router();

router.post("/add", AddRestaurant);
router.get("/list", GetRestaurants);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

router.get('/getByOwnerName', getRestaurantByOwnerName);

module.exports = router;
