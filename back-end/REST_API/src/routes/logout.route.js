const express = require('express');
const router = express.Router();

const logout_controller = require('../controllers/logout.controller.js');
//router.post('/logout',logout_controller.logout);

const middle_check = require('../authentication/auth.js');
router.post('/',function(req, res){
  middle_check.findByToken(req,res,logout_controller.logout,0)
});

module.exports = router;