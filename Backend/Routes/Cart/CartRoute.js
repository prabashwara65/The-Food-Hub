const express = require('express')

const {createCart, getCartItems, updateSelectStatus, deleteCartItem, updateQuantity} = require ('../../Controller/Cart/CartController')

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
  router.get("/getCartItem/:email", getCartItems)

// Route to update selectStatus of the cart item
router.put('/updateSelectStatus/:cartId', updateSelectStatus) 

//delete cart item
router.delete('/:id', deleteCartItem)

//update quantity
router.put('/updateQuantity/:id', updateQuantity)

  module.exports = router