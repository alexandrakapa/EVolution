const express = require('express');
const router = express.Router();


const vehicleController = require('../controllers/vehicle.controller');

// get vehicle ny ID
router.get('/:vehicleID', vehicleController.getvehiclebyid);

router.get("/",vehicleController.getCarList);

module.exports = router;
