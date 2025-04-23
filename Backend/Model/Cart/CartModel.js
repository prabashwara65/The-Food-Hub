const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CartSchema  = new Schema({
    cartId: {type: String, required : true},
    restaurantId : {type: String, required : true , default:'RI-0001'},
    menuId: {type: String, required : true},
    email: {type: String, required : true},
    quantity: {type: Number, required : true, default: 1},
    image: {type: String, required : true},
    price : {type: Number, required : true},
    selectStatus: {type: Boolean, required : true, default: false},
}, {timestamps:true})

module.exports = mongoose.model("Cart", CartSchema)
