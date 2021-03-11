const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_point.controller');

// router.get('/:pointID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getPoint);

//router.get('/:pointID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getSessionsByPoint);
const middle_check = require('../authentication/auth.js');
router.get('/:pointID/:yyyymmdd_from/:yyyymmdd_to',function(req, res){
  middle_check.findByToken(req,res,sessionController.getPoint,0)
});

module.exports = router;
