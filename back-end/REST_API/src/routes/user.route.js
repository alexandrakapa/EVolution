const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({ dest:'uploads/' })

const userController = require('../controllers/user.controller');

// get all users
router.get('/users/', userController.getUserList);

// get user by username
router.get('/users/:username',userController.getOwnerByUsername);

router.post('/usermod/:username/:password',userController.createOrUpdateUser);

router.post('/system/sessionsupd', upload.single('file'), (req, res) => { //sample is written as key in postman
  console.log(`new upload = ${req.file.filename}\n`);
  console.log(req.file);
  res.json({ message: 'Upload Works' });
});



module.exports = router;
