const express = require('express');
const router = express.Router();

const energy_cost_controller = require('../controllers/energy_cost.controller');

router.get('/PerModel/:manufacturerID/:model/:yyyymmdd_from/:yyyymmdd_to', energy_cost_controller.getCostPerModel);

router.get('/Total/:yyyymmdd_from/:yyyymmdd_to',energy_cost_controller.getTotalCost);

router.get('/GetModels/:manufacturerID', energy_cost_controller.getModels);


module.exports = router;