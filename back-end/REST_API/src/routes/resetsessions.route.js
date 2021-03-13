const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/resetsessions.controller');
const middle_check = require('../authentication/auth.js');

router.post('/resetsessions', sessionController.Reset);
// router.post('/resetsessions',function(req, res){
//     middle_check.findByToken(req,res,sessionController.Reset,0)//change to 1
//   });

module.exports = router;
