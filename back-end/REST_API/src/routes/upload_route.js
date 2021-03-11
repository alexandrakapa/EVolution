const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });

const uploadController = require('../controllers/upload_controller');

// get all users
router.post('/', upload.single('file'),uploadController.getFile);


module.exports = router;