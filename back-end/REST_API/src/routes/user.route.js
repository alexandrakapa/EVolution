const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
const uploadController = require('../controllers/upload_controller');
const userController = require('../controllers/user.controller');
const middle_check = require('../authentication/auth.js');

// get all users
// router.get('/users/', userController.getUserList);
router.get('/users/',function(req, res){
  middle_check.findByToken(req,res,userController.getUserList,0)
});

// get user by username
// router.get('/users/:username',userController.getOwnerByUsername);
router.get('/users/:username',function(req, res){
  middle_check.findByToken(req,res,userController.getOwnerByUsername,0)
});


// router.post('/usermod/:username/:password',userController.createOrUpdateUser);
router.post('/usermod/:username/:password',function(req, res){
  middle_check.findByToken(req,res,userController.createOrUpdateUser,1)
});
//TODO:check


router.post('/system/sessionsupd', upload.single('file'),uploadController.getFile);

// TODO: change with uploadcsv!

router.post('/UpdatePoints/:username/:price/:points',function(req, res){
  middle_check.findByToken(req,res,userController.UpdatePoints,0)
});

module.exports = router;
