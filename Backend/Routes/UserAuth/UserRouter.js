const express = require("express");

const { RegisterUser , LoginUser } = require("../../Controller/UserAuth/UserController");

const router = express.Router();

router.post("/register", RegisterUser);

router.post("/login" , LoginUser);

module.exports = router;
