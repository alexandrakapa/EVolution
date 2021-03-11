const express = require('express');
const router = express.Router();

const energy_cost_controller = require('../controllers/energy_cost.controller');

// router.get('/PerModel/:manufacturerID/:model/:yyyymmdd_from/:yyyymmdd_to', energy_cost_controller.getCostPerModel);

// router.get('/Total/:yyyymmdd_from/:yyyymmdd_to',energy_cost_controller.getTotalCost);

// router.get('/GetModels/:manufacturerID', energy_cost_controller.getModels);
const middle_check = require('../authentication/auth.js');

router.get('/PerModel/:manufacturerID/:model/:yyyymmdd_from/:yyyymmdd_to',function(req, res){
    middle_check.findByToken(req,res,energy_cost_controller.getCostPerModel,0)
  });

  router.get('/Total/:yyyymmdd_from/:yyyymmdd_to',function(req, res){
    middle_check.findByToken(req,res,energy_cost_controller.getTotalCost,0)
  });

  router.get('/GetModels/:manufacturerID',function(req, res){
    middle_check.findByToken(req,res,energy_cost_controller.getModels,0)
  });


module.exports = router;
