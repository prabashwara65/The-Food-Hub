const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    email: String,
    amount: Number,
    items: Array,
    paymentStatus: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Order", orderSchema);