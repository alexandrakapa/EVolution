const express = require('express');
const router = express.Router();


const vehicleController = require('../controllers/vehicle.controller');
const middle_check = require('../authentication/auth.js');

// get vehicle ny ID
// router.get('/:vehicleID', vehicleController.getvehiclebyid);
router.get('/:vehicleID',function(req, res){
    middle_check.findByToken(req,res,vehicleController.getvehiclebyid,0)
  });

router.get('/ofOwner/:username', function(req, res){
    middle_check.findByToken(req,res,vehicleController.getvehiclebyowner,0)
});

module.exports = router;
