const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_EV.controller');
const middle_check = require('../authentication/auth.js');

// router.get('/:vehicleID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getVehicle);
router.get('/:vehicleID/:yyyymmdd_from/:yyyymmdd_to',function(req, res){
    middle_check.findByToken(req,res,sessionController.getVehicle,0)
  });
module.exports = router;
