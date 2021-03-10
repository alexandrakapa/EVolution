const express = require('express');
const router = express.Router();

const station_points_controller = require('../controllers/station_points.controller');
const middle_check = require('../authentication/auth.js');


router.get('/:stationID',function(req,res){
  middle_check.findByToken(req,res,station_points_controller.getStationPoints,0)
 });


module.exports = router;
