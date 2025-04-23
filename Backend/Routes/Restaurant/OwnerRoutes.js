const express = require("express");
const {
  RegisterOwner,
  LoginOwner,
} = require("../../Controller/Restaurant/RestaurantController");

const router = express.Router();

router.post("/register", RegisterOwner);
router.post("/login", LoginOwner);

module.exports = router;
