const express = require("express");

const { createMenu, getMenus, updateMenu, deleteMenu} =  require('../../Controller/Menu/MenuController')

const router = express.Router()
const fileupload = require("express-fileupload")

router.use(
    fileupload({
      createParentPath: true,
      useTempFiles: false,
      limits: { fileSize: 10 * 1024 * 1024 },
    })
  );

//create new menu
router.post("/", createMenu)

//get all the menus
router.get("/", getMenus)

//update menu
router.patch("/:id", fileupload(),updateMenu)

//delete menu
router.delete("/:id", deleteMenu)


module.exports = router
