const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// get all users
router.get('/users/', userController.getUserList);

// get user by username
router.get('/users/:username',userController.getOwnerByUsername);

//update user password
router.post('/usermod/:username/:password',userController.updateUser);

module.exports = router;
