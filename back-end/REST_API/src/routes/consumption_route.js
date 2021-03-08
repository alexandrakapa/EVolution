const express = require('express');
const router = express.Router();

const consumption_controller = require('../controllers/consumption_controller.js');
const middle_check = require('../authentication/auth.js');
router.post('/',function(req, res){
  middle_check.findByToken(req,res,consumption_controller.consume,0)
});
module.exports = router;