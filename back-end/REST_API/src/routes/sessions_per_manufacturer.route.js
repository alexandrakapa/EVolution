const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_manufacturer.controller');

router.get('/:manufacturerID/:region/:yyyymmdd_from/:yyyymmdd_to', sessionController.getSessions);

//router.get('/:pointID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getSessionsByPoint);


module.exports = router;