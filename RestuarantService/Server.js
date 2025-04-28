require("dotenv").config();
const express = require('express');
const { mongoose } = require("mongoose");
const cors = require("cors");

const RestaurantRouter = require("./Routes/Restaurant/RestaurantRoutes");
const MenuRouter = require('./Routes/Menu/MenuRouter')
const SearchRestaurantRouter = require('./Routes/RestaurantView/SearchRestaurantRoute')

const app = express();


// Middlewares
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  credentials: true,
}));

// Routes
app.use("/api/restaurant", RestaurantRouter);
app.use('/api/menu', MenuRouter)
app.use('/api/restaurantView', SearchRestaurantRouter)

// Database connection and server start
mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Restuarant Service is running on Port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
