require('dotenv').config()

const express = require('express')
const { default: mongoose } = require('mongoose')

const app = express()

app.use('/' , (req , res) => {
    res.json("Backend is working ")
})

mongoose.connect(process.env.DB)
.then(()=> {
    app.listen(process.env.PORT , () => {
        console.log("Server is running on Port " + process.env.PORT)
    })
}).catch((error => {
    console.log(error)
})) 

