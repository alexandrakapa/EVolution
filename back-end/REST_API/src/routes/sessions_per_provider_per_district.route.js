const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_provider_per_district.controller');

router.get('/:supplierID/:region/:yyyymmdd_from/:yyyymmdd_to', sessionController.getSessions);


module.exports = router;
