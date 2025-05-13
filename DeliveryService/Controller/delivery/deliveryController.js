const Driver = require('../../Model/delivery/Driver');
const Assignment = require('../../Model/delivery/Assignment'); // Import the Assignment model
const { Client } = require('@googlemaps/google-maps-services-js');
const nodemailer = require('nodemailer'); // Import Nodemailer
const client = new Client({});

const GOOGLE_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

exports.assignDriver = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    if (!lat || !lng) return res.status(400).json({ error: 'Order location is required.' });

    console.log("Order location received:", { lat, lng });

    // Get available drivers
    const drivers = await Driver.find({ available: true });
    if (drivers.length === 0) return res.status(404).json({ error: "No available drivers." });

    // Calculate distances
    const driverDistances = await Promise.all(
      drivers.map(async (driver) => {
        try {
          const response = await client.distancematrix({
            params: {
              origins: [`${driver.location.lat},${driver.location.lng}`],
              destinations: [`${lat},${lng}`],
              key: GOOGLE_API_KEY,
              mode: 'driving'
            }
          });

          const element = response.data.rows[0]?.elements[0];
          if (!element || element.status !== "OK") return null;

          return {
            driver,
            distance: element.distance.value // in meters
          };
        } catch (error) {
          console.error(`Error for driver ${driver.name}:`, error.message);
          return null;
        }
      })
    );

    const validDrivers = driverDistances.filter(d => d !== null);
    if (validDrivers.length === 0) return res.status(500).json({ error: "No valid drivers found." });

    const nearest = validDrivers.sort((a, b) => a.distance - b.distance)[0];
    const assignedDriver = nearest.driver;

    // Get directions
    const directionsResponse = await client.directions({
      params: {
        origin: `${assignedDriver.location.lat},${assignedDriver.location.lng}`,
        destination: `${lat},${lng}`,
        key: GOOGLE_API_KEY,
        mode: 'driving'
      }
    });

    // Mark the driver as unavailable
    assignedDriver.available = false;
    await assignedDriver.save();

    // Save the assignment in the database
    const assignment = new Assignment({
      driver: assignedDriver._id,
      orderLocation: { lat, lng },
      distance: `${(nearest.distance / 1000).toFixed(1)} km`,
      eta: calculateETA(nearest.distance)
    });
    await assignment.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: assignedDriver.email, // Use the driver's email from the database
      subject: 'Driver Assigned for Your Delivery',
      text: `Hello,

A driver has been assigned for your delivery.

Driver Details:
- Name: ${assignedDriver.name}
- Vehicle: ${assignedDriver.vehicleType}
- Contact: ${assignedDriver.phone}
- Distance: ${(nearest.distance / 1000).toFixed(1)} km
- ETA: ${calculateETA(nearest.distance)}

Thank you for using The Food Hub!

Best regards,
The Food Hub Team`
    };

    await transporter.sendMail(mailOptions);

    // Respond with the assigned driver and directions
    res.json({
      driver: assignedDriver.name,
      vehicleType: assignedDriver.vehicleType,
      contact: assignedDriver.phone,
      distance: `${(nearest.distance / 1000).toFixed(1)} km`,
      eta: calculateETA(nearest.distance),
      location: assignedDriver.location,
      directions: directionsResponse.data
    });

  } catch (err) {
    console.error("Assignment error:", err);
    res.status(500).json({ error: "Failed to assign driver", details: err.message });
  }
};

function calculateETA(distanceMeters) {
  const avgSpeedKmph = 30; // Average speed in km/h
  const distanceKm = distanceMeters / 1000; // Convert meters to kilometers
  return Math.round((distanceKm / avgSpeedKmph) * 60) + ' minutes'; // Return ETA in minutes
}