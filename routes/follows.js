const express = require('express');
const router = express.Router();
const followControllers = require('../controllers/followController');
const { catchAsync } = require('../service/errorHandler');

// 取得個人追蹤名單
router.get('/follows', catchAsync(followControllers.getFollows));

// 追蹤
router.post('/follow/:userId', catchAsync(followControllers.addFollow));

// 取消追蹤
router.delete('/follow/:userId', catchAsync(followControllers.deleteFollow));

module.exports = router;
