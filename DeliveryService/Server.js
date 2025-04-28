require("dotenv").config();
const express = require('express')
const { mongoose } = require("mongoose");
const cors = require("cors");

const driverRoutes = require('./Routes/delivery/driverRoutes');
const deliveryRoutes = require('./Routes/delivery/deliveryRoutes')

const app = express()


//middleware
app.use(express.json());

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
      credentials: true,
    })
  );

  
app.use('api/deliver' , deliveryRoutes)
app.use('/api/drivers', driverRoutes);


mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Delivery Service is running on Port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });