require("dotenv").config();
const express = require('express');
const { mongoose } = require("mongoose");
const cors = require("cors");

const CartRouter = require('./Routes/Cart/CartRoute');
const CheckoutRouter = require('./Routes/Cart/StripePaymentRoute');
const { handleStripeWebhook } = require('./Controller/Cart/StripePaymentController');


const app = express();


// Stripe webhook needs raw body
app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ["http://foodhub.local"],
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true,
}));

// Routes
app.use('/api/cart', CartRouter);
app.use('/api/checkout', CheckoutRouter);

// Database connection and server start
mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Payment Service is running on Port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
