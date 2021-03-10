const express = require('express');
const router = express.Router();

const station_addresses_controller = require('../controllers/station_addresses.controller');

router.get('/', station_addresses_controller.getStationAddresses);


module.exports = router;