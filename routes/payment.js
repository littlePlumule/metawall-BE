const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { isAuth } = require('../service/auth');

router.post('/createOrder', isAuth, paymentController.createOrder);

router.get('/orders', isAuth, paymentController.getOrders);

router.get('/order/:orderNo', isAuth, paymentController.getOrder);

module.exports = router;