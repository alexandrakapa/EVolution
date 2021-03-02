const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_point.controller');

router.get('/:pointID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getPoint);

//router.get('/:pointID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getSessionsByPoint);


module.exports = router;