const { request } = require('express');
const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/SessionsPerStation.controller');

router.get('/:stationID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getStation);

module.exports = router;