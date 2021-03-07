const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_EV.controller');

router.get('/:vehicleID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getVehicle);

module.exports = router;