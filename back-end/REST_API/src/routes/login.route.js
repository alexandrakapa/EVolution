const express = require('express');
const router = express.Router();

const login_controller = require('../controllers/login.controller.js');
router.post('/',login_controller.login);
//router.post('/authorize',auth_token.verifyToken);


module.exports = router;