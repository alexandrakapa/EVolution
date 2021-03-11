const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/PaymentFirstPage_OwedInfo.controller');
const middle_check = require('../authentication/auth.js');


router.get('/:username',function(req, res){
    middle_check.findByToken(req,res,sessionController.Owed,0)
  });

module.exports = router;
