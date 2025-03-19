const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
    
const UserRegistrationSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})




//Create registraion Statics function 
UserRegistrationSchema.statics.Register = async function (name , email , password){
    const exit = await this.findOne({email})

    if(exit){
        throw Error("Email Already in use")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password , salt)

    const user = await this.create({name , email , password:hash})

    return user 
}

module.exports = mongoose.model("User" , UserRegistrationSchema)