const express = require("express");
const {
  RegisterOwner,
  LoginOwner,
} = require("../../Controller/Restaurant/OwnerController");

const router = express.Router();

router.post("/register", RegisterOwner);
router.post("/login", LoginOwner);

module.exports = router;
