const express = require('express');
const router = express.Router();
const likeControllers = require('../controllers/likeController');
const { catchAsync } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');
const { checkPostId } = require('../service/checkId');


// 取得所有收藏
router.get('/likes', isAuth, catchAsync(likeControllers.getLikes));

// 按讚
router.post('/like/:postId', checkPostId, isAuth, catchAsync(likeControllers.addLike));

// 取消按讚
router.delete('/unlike/:postId', checkPostId, isAuth, catchAsync(likeControllers.deleteLike));

module.exports = router;