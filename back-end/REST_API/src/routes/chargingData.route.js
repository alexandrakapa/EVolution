const express = require('express');
const router = express.Router();


const chargingDataController = require('../controllers/chargingData.controller');
const middle_check = require('../authentication/auth.js');

// get charging data by ID
router.get('/:chargingID',function(req, res){
    middle_check.findByToken(req,res,chargingDataController.getChargingData,0)
  });


//get charging data by owner username and vehicle id
router.get('/:username/:vehicleID',function(req, res){
    middle_check.findByToken(req,res,chargingDataController.getChargingDataByOwner,0)
  });

//get charging cost
router.get('/:chargingID/chargingCost',function(req, res){
    middle_check.findByToken(req,res,chargingDataController.getChargingCost,0)
  });

module.exports = router;
