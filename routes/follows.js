const express = require('express');
const router = express.Router();
const followControllers = require('../controllers/followController');
const { catchAsync } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');
const { checkUserId } = require('../service/checkId');

// 取得個人追蹤名單
router.get('/follows', isAuth, catchAsync(followControllers.getFollows));

// 追蹤
router.post('/follow/:userId', checkUserId, isAuth, catchAsync(followControllers.addFollow));

// 取消追蹤
router.delete('/unfollow/:userId', checkUserId, isAuth, catchAsync(followControllers.deleteFollow));

module.exports = router;
