const express = require('express');
const router = express.Router();

const stationInfoController = require('../controllers/stationInfo.controller');

router.get('/allStations', stationInfoController.getAllStations);
router.get('/:stationID', stationInfoController.getStationInfo);
router.get('/:stationID/stationReview', stationInfoController.getStationReview);

module.exports = router;
