require('dotenv').config()

const express = require('express')
const { mongoose } = require('mongoose')
const cors = require('cors')

const  UserRouter  = require('./Routes/UserAuth/UserRouter')

const app = express()

//middleware
app.use(express.json())

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true
}));


app.use('/api/auth' , UserRouter)


mongoose.connect(process.env.DB)
.then(()=> {
    app.listen(process.env.PORT , () => {
        console.log("Server is running on Port " + process.env.PORT)
    })
}).catch((error => {
    console.log(error)
})) 

