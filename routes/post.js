const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postController');
const { catchAsync } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');
const { checkPostId, checkUserId } = require('../service/checkId');

// 取得所有貼文 
router.get('/posts', isAuth, catchAsync(postControllers.getAllPosts));

// 取得個人所有貼文 
router.get('/posts/:userId', checkUserId, isAuth, catchAsync(postControllers.getPosts));

// 取得單一貼文
router.get('/post/:postId', checkPostId, isAuth, catchAsync(postControllers.getPost));

// 新增單一貼文
router.post('/post', isAuth, catchAsync(postControllers.createdPost));

// 編輯單一貼文
router.patch('/post/:postId', checkPostId, isAuth, catchAsync(postControllers.updatePost));

// 刪除單一貼文
router.delete('/post/postId', checkPostId, isAuth, catchAsync(postControllers.deletePost));

module.exports = router;
