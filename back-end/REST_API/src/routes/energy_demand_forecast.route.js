const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/energy_demand_forecast.controller');
const middle_check = require('../authentication/auth.js');

// router.get('/:providerID/:yyyy_from/:yyyy_to', sessionController.getSessions);

router.get('/:providerID/:yyyy_from/:yyyy_to',function(req, res){
    middle_check.findByToken(req,res,sessionController.getSessions,0)
  });



module.exports = router;
