const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_manufacturer.controller');

// router.get('/:manufacturerID/:region/:yyyymmdd_from/:yyyymmdd_to', sessionController.getSessions);

//router.get('/:pointID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getSessionsByPoint);
const middle_check = require('../authentication/auth.js');

router.get('/:manufacturerID/:region/:yyyymmdd_from/:yyyymmdd_to',function(req, res){
    middle_check.findByToken(req,res,sessionController.getSessions,0)
  });

 
  router.get('/:pointID/:yyyymmdd_from/:yyyymmdd_to',function(req, res){
    middle_check.findByToken(req,res,sessionController.getSessionsByPoint,0)
  });
module.exports = router;
