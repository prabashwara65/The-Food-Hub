require("dotenv").config();

const express = require("express");
const { mongoose } = require("mongoose");
const cors = require("cors");

const  UserRouter  = require('./Routes/UserAuth/UserRouter')
const MenuRouter = require('./Routes/Menu/MenuRouter')
const SearchRestaurantRouter = require('./Routes/RestaurantView/SearchRestaurantRoute')
const CartRouter = require('./Routes/Cart/CartRoute')
const OrderRouter = require('./Routes/Order/OrderRouter')
const CheckoutRouter = require('./Routes/Cart/StripePaymentRoute')

const {handleStripeWebhook} = require('./Controller/Cart/StripePaymentController')

const RestaurantRouter = require("./Routes/Restaurant/RestaurantRoutes");
const OwnerRoutes = require("./Routes/Restaurant/OwnerRoutes");

const app = express()

// ⚠️ Stripe requires the raw body for webhook signature verification
app.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);


//middleware
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use('/api/auth' , UserRouter)
app.use('/api/menu', MenuRouter)
app.use('/api/restaurantView', SearchRestaurantRouter)
app.use('/api/cart', CartRouter)
app.use('/api/order' , OrderRouter)
app.use('/api/checkout', CheckoutRouter)
app.use("/api/restaurant", RestaurantRouter);
app.use("/api/owner", OwnerRoutes);
// app.use("/api/searchres", SearchRestaurantRoute);



mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server is running on Port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
