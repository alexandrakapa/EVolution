
const { request } = require('express');
const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/SessionsPerStation.controller');

// router.get('/:stationID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getStation);

const middle_check = require('../authentication/auth.js');
router.get('/:stationID/:yyyymmdd_from/:yyyymmdd_to',function(req, res){
  middle_check.findByToken(req,res,sessionController.getStation,0)
});
module.exports = router;