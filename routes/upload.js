const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { catchAsync } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');
const upload = require('../service/image');

router.post('/', upload, isAuth, catchAsync(uploadController.uploadImage));

module.exports = router;