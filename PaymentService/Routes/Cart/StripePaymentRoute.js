const express = require("express");
const router = express.Router();
const {createCheckoutSession} = require("../../Controller/Cart/StripePaymentController");

//create checkout session 
router.post('/create-checkout-session', createCheckoutSession);

module.exports = router