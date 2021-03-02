const express = require('express');
const router = express.Router();

const healthcheckController = require('../controllers/healthcheck.controller');

// get all users
router.get('/healthcheck', healthcheckController.check);

module.exports= router;