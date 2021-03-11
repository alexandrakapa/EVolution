const express = require('express');
const router = express.Router();

const stationInfoController = require('../controllers/stationInfo.controller');

// router.get('/allStations', stationInfoController.getAllStations);
// router.get('/:stationID', stationInfoController.getStationInfo);
// router.get('/:stationID/stationReview', stationInfoController.getStationReview);

const middle_check = require('../authentication/auth.js');
router.get('/allStations',function(req, res){
  middle_check.findByToken(req,res,stationInfoController.getAllStations,0)
});

router.get('/:stationID',function(req, res){
    middle_check.findByToken(req,res,stationInfoController.getStationInfo,0)
  });

  router.get('/:stationID/stationReview',function(req, res){
    middle_check.findByToken(req,res,stationInfoController.getStationReview,0)
  });
module.exports = router;
