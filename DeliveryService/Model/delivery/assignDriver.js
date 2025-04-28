const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  vehicleType: { 
    type: String, 
    required: true,
    enum: ['bike', 'car', 'truck']
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('assignDriver', DriverSchema);