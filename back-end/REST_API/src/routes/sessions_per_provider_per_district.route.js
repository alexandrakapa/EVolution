const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_provider_per_district.controller');

// router.get('/:supplierID/:region/:yyyymmdd_from/:yyyymmdd_to', sessionController.getSessions);


const middle_check = require('../authentication/auth.js');
router.get('/:supplierID/:region/:yyyymmdd_from/:yyyymmdd_to',function(req, res){
  middle_check.findByToken(req,res,sessionController.getSessions,0)
});

module.exports = router;
