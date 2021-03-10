
const express = require('express');
const router = express.Router();

const healthcheckController = require('../controllers/healthcheck.controller');
const middle_check = require('../authentication/auth.js');

// get all users
// router.get('/healthcheck', healthcheckController.check);

router.get('/healthcheck',function(req, res){
    middle_check.findByToken(req,res,healthcheckController.check,0)
  });

module.exports= router;;
