const express = require("express");

const { createMenu} =  require('../../Controller/Menu/MenuController')

const router = express.Router();

router.post("/", createMenu);


module.exports = router;
