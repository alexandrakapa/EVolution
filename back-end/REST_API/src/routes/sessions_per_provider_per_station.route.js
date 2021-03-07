const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_provider_per_station.controller');

router.get('/:supplierID/:station/:yyyymmdd_from/:yyyymmdd_to', sessionController.getSessions);


module.exports = router;
