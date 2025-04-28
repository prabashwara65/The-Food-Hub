const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CartSchema  = new Schema({
    cartId: {type: String, required : true},
    menuId: {type: String, required : true},
    email: {type: String, required : true},
    quantity: {type: Number, required : true, default: 1},
    price : {type: Number, required : true},
    selectStatus: {type: Boolean, required : true, default: false},
}, {timestamps:true})

module.exports = mongoose.model("Cart", CartSchema)
