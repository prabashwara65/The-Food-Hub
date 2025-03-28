const express = require("express");

const { createMenu, getMenus} =  require('../../Controller/Menu/MenuController')

const router = express.Router()

//create new menu
router.post("/", createMenu)

//get all the menus
router.get("/", getMenus)

module.exports = router;
