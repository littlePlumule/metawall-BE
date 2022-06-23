const express = require('express');
const router = express.Router();
const likeControllers = require('../controllers/likeController');
const { catchAsync } = require('../service/errorHandler');

// 取得所有收藏
router.get('/likes', catchAsync(likeControllers.getLikes));

// 按讚
router.post('/like/:postId', catchAsync(likeControllers.addLike));

// 取消按讚
router.delete('/like/:postId', catchAsync(likeControllers.deleteLike));

module.exports = router;