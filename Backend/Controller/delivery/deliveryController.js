const Driver = require('../../Model/delivery/Driver');
const { Client } = require('@googlemaps/google-maps-services-js');
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

    assignedDriver.available = false;
    await assignedDriver.save();

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
  const avgSpeedKmph = 30;
  const distanceKm = distanceMeters / 1000;
  return Math.round((distanceKm / avgSpeedKmph) * 60) + ' minutes';
}
