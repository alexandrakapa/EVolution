const express = require('express');
const router = express.Router();

const station_points_controller = require('../controllers/station_points.controller');

router.get('/:stationID', station_points_controller.getStationPoints);


module.exports = router;