const express = require('express');
const router = express.Router();
const driverController = require('../../Controller/delivery/driverController');

// POST /api/drivers - Add a new driver
router.post('/', driverController.addDriver);

// GET /api/drivers/available - List available drivers (for testing)
router.get('/available', driverController.getAvailableDrivers);

module.exports = router;