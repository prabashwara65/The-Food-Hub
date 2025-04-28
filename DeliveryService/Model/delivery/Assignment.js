const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver', // Reference to the Driver model
    required: true
  },
  orderLocation: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  distance: { type: String, required: true }, // Distance between driver and order location
  eta: { type: String, required: true }, // Estimated time of arrival
  assignedAt: { type: Date, default: Date.now } // Timestamp for when the assignment was created
});

module.exports = mongoose.model('Assignment', AssignmentSchema);