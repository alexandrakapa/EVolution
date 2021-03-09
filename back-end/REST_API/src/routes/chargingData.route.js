const express = require('express');
const router = express.Router();


const chargingDataController = require('../controllers/chargingData.controller');

// get charging data by ID
router.get('/:chargingID', chargingDataController.getChargingData);


//get charging data by owner username and vehicle id
router.get('/:username/:vehicleID', chargingDataController.getChargingDataByOwner);

//get charging cost
router.get('/:chargingID/chargingCost', chargingDataController.getChargingCost);

module.exports = router;
