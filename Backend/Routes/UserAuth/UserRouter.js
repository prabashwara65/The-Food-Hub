const express = require("express");

const { RegisterUser } = require("../../Controller/UserAuth/UserController");

const router = express.Router();

router.post("/register", RegisterUser);

module.exports = router;
