const mongoose = require('mongoose');

const DriverSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Driver name is required"] 
  },
  phone: { 
    type: String, 
    required: [true, "Phone number is required"],
    match: [/^\+?\d{10,15}$/, "Invalid phone number"] 
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure email is unique
    match: [/^\S+@\S+\.\S+$/, "Invalid email address"] // Validate email format
  },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  available: { 
    type: Boolean, 
    default: true 
  },
  vehicleType: { 
    type: String, 
    required: [true, "Vehicle type is required"],
    enum: ["bike", "car", "truck"], // Restrict to specific vehicle types
    default: "bike" // Default vehicle type
  }
});

module.exports = mongoose.model('Driver', DriverSchema);