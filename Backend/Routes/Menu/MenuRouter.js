const express = require("express");

const { createMenu, getMenus, updateMenu, deleteMenu} =  require('../../Controller/Menu/MenuController')

const router = express.Router()

//create new menu
router.post("/", createMenu)

//get all the menus
router.get("/", getMenus)

//update menu
router.patch("/:id", updateMenu)

//delete menu
router.delete("/:id", deleteMenu)


module.exports = router
