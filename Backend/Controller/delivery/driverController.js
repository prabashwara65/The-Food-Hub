const Driver = require('../../Model/delivery/Driver');

const addDriver = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the incoming request body for debugging

    // Create a new driver using the request body
    const driver = new Driver(req.body);

    // Save the driver to the database
    await driver.save();

    // Respond with successp
    res.status(201).json({ message: 'Driver added successfully', driver });
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(400).json({ error: 'Failed to add driver', details: error.message });
  }
};

const getAvailableDrivers = async (req, res) => {
  try {
    // Fetch all available drivers
    const drivers = await Driver.find({ available: true });
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).json({ error: 'Failed to fetch available drivers', details: error.message });
  }
};

module.exports = {
  addDriver,
  getAvailableDrivers,
};