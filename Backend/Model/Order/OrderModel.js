const mongoose = require('mongoose')

const schema = mongoose.Schema

const OrderSchema = new schema({
    status:{
        type: String
    }
})

module.exports = mongoose.model('order' , OrderSchema)