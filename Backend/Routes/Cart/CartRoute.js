const express = require('express')

const {createCart} = require ('../../Controller/Cart/CartController')

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

  module.exports = router