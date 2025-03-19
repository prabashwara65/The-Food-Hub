const mongoose = require("mongoose");

const Schema = mongoose.Schema
    
const UserRegistration = new Schema({
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

module.exports = mongoose.model("User" , UserRegistration)


//Create registraion Statics function 
UserRegistration.statics.Register = async function (email , password){
    const exit = await this.findOne({email})

    if(exit){
        throw Error("Email Already in use")
    }

    const salt = await bcrypt.getSalt(10)
    const hash = await bcrypt.hash(password , salt)

    const user = await this.create({email , password:hash})

    return user 
}
