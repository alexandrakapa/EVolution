const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/sessions_per_provider.controller');

router.get('/:providerID/:yyyymmdd_from/:yyyymmdd_to', sessionController.getProvider);

module.exports = router;
