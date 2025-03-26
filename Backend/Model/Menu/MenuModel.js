const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MenuSchema  = new Schema({
    menuId: {type: String, required : true},
    restaurantId : {type: String, required : true , default:'RI-0001'},
    title: {type: String, required : true},
    description: {type: String},
    price : {type: Number, required : true},
    availability: {type: Boolean, required: true, default: true},
    photos: { type: [String], validate: v => v.length >= 3 },
    category: {type:String}
}, {timestamps:true})

module.exports = mongoose.model("Menu", MenuSchema)
