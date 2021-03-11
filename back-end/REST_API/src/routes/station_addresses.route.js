const express = require('express');
const router = express.Router();

const station_addresses_controller = require('../controllers/station_addresses.controller');
const middle_check = require('../authentication/auth.js');

router.get('/',function(req, res){
  middle_check.findByToken(req,res,station_addresses_controller.getStationAddresses,0)
 });


module.exports = router;
