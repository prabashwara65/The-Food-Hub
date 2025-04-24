const express = require('express')

const {createCart, getCartItems} = require ('../../Controller/Cart/CartController')

const router = express.Router()
const fileupload = require("express-fileupload")

router.use(
    fileupload({
      createParentPath: true,
      useTempFiles: false,
      limits: { fileSize: 10 * 1024 * 1024 },
    })
  );

  //create new cart item for specific user
  router.post("/", createCart);

  //get specific user cart items
  router.get("/getCartItem", getCartItems)

  module.exports = router