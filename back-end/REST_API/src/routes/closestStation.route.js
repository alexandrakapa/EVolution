const express = require('express');
const router = express.Router();

const closestStationController = require('../controllers/closestStation.controller');

router.get('/:postalcode', closestStationController.getStationByCode);
router.get('/:postalcode/:lowerprice/:higherprice', closestStationController.getStationByCodePrice);
router.get('/:postalcode/:payment', closestStationController.getStationByCodePay);
router.get('/:postalcode/:payment/:lowerprice/:higherprice', closestStationController.getStationByCodePricePay);

module.exports = router;
