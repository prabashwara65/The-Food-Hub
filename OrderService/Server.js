require("dotenv").config();
const express = require('express')
const { mongoose } = require("mongoose");
const cors = require("cors");

const OrderRouter = require('./Routes/Order/OrderRouter')

const app = express()


//middleware
app.use(express.json());

app.use(
    cors({
      origin: ["http://localhost:30080"],
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
      credentials: true,
    })
  );

  
app.use('/api/order' , OrderRouter)


mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Order Service is running on Port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });