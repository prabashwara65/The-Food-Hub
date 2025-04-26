const Driver = require('../../Model/delivery/DeliveryPersonnel');

// Add a new driver
const addDriver = async (driverData) => {
  return await Driver.create(driverData);
};

// Get all available drivers
const getAvailableDrivers = async () => {
  return await Driver.find({ available: true });
};

module.exports = {
  addDriver,
  getAvailableDrivers
};