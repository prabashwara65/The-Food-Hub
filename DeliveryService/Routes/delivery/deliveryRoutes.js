const express = require('express');
const router = express.Router();
const deliveryController = require('../../Controller/delivery/deliveryController');

// POST /api/assign-driver
router.post('/assign-driver', deliveryController.assignDriver);

module.exports = router;