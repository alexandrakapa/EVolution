const express = require('express');
const router = express.Router();

const login_controller = require('../controllers/user.controller.js');
const auth_token = require('../../middleware/auth_token.js');
router.post('/',login_controller.login);
router.post('/authorize',auth_token.verifyToken);


module.exports = router;
