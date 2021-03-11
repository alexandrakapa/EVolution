const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_provider.controller');

// router.get('/:providerID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getProvider);
const middle_check = require('../authentication/auth.js');
router.get('/:supplierID/:station/:yyyymmdd_from/:yyyymmdd_to',function(req, res){
  middle_check.findByToken(req,res,sessionController.getProvider,0)
});
module.exports = router;
