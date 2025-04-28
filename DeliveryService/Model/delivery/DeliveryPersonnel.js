const mongoose = require('mongoose');

const DeliveryPersonnelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('DeliveryPersonnel', DeliveryPersonnelSchema);