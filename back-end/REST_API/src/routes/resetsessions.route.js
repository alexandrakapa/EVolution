const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/resetsessions.controller');

router.post('/resetsessions', sessionController.Reset);

module.exports = router;
