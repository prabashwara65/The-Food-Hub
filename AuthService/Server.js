require("dotenv").config();
const express = require('express')
const { mongoose } = require("mongoose");
const cors = require("cors");

const UserRouter  = require('./Routes/UserAuth/UserRouter')
const OwnerRouter = require('./Routes/UserAuth/OwnerRoutes')

const app = express()


//middleware
app.use(express.json());

app.use(
    cors({
      origin: ["http://foodhub.local"],
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
      credentials: true,
    })
  );
  
app.use('/api/auth' , UserRouter)
app.use('/api/owner', OwnerRouter)


mongoose
  .connect(process.env.DB)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Auth Service is running on Port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });