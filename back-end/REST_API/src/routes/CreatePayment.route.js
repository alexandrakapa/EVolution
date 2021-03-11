const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/CreatePayment.controller');
const middle_check = require('../authentication/auth.js');

router.post('/:username/:moneypaid/:paymentway/:bankID/:pointsused',function(req, res){
    middle_check.findByToken(req,res,paymentController.postPayment,0)
  });

module.exports = router;
