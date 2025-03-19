require('dotenv').config()

const express = require('express')
const { mongoose } = require('mongoose')

const  UserRouter  = require('./Routes/UserAuth/UserRouter')

const app = express()

//middleware
app.use(express.json())

app.use('/' , (req , res) => {
    res.json("Backend is working ")
})

app.use('/api/register' , UserRouter)

mongoose.connect(process.env.DB)
.then(()=> {
    app.listen(process.env.PORT , () => {
        console.log("Server is running on Port " + process.env.PORT)
    })
}).catch((error => {
    console.log(error)
})) 

