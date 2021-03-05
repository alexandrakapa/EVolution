const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/energy_demand_forecast.controller');

router.get('/:supplierID/:yyyy_from/:yyyy_to', sessionController.getSessions);


module.exports = router;
