const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/charging_statistics_km.controller');
const middle_check = require('../authentication/auth.js');

// router.get('/:providerID/:yyyy_from/:yyyy_to', sessionController.getSessions);

router.get('/:username/:yyyy_from',function(req, res){
    middle_check.findByToken(req,res,sessionController.getSessions,0)
  });



module.exports = router;
