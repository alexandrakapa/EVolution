const express = require('express');
const router = express.Router();

const closestStationController = require('../controllers/closestStation.controller');
const middle_check = require('../authentication/auth.js');

// router.get('/:postalcode', closestStationController.getStationByCode);
// router.get('/:postalcode/:lowerprice/:higherprice', closestStationController.getStationByCodePrice);
// router.get('/:postalcode/:payment', closestStationController.getStationByCodePay);
// router.get('/:postalcode/:payment/:lowerprice/:higherprice', closestStationController.getStationByCodePricePay);

router.get('/:postalcode',function(req, res){
    middle_check.findByToken(req,res,closestStationController.getStationByCode,0)
  });

  router.get('/:postalcode/:lowerprice/:higherprice',function(req, res){
    middle_check.findByToken(req,res,closestStationController.getStationByCodePrice,0)
  });

  router.get('/:postalcode/:payment',function(req, res){
    middle_check.findByToken(req,res,closestStationController.getStationByCodePay,0)
  });

  router.get('/:postalcode/:payment/:lowerprice/:higherprice',function(req, res){
    middle_check.findByToken(req,res,closestStationController.getStationByCodePricePay,0)
  });
module.exports = router;
