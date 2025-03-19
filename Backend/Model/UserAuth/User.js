import mongoose from "mongoose";

const Schema = mongoose.Schema
    
const UserRegistration = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: email,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("User" , UserRegistration)