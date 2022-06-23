const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postController');
const { catchAsync } = require('../service/errorHandler');

// 取得所有貼文 
router.get('/posts', catchAsync(postControllers.getPosts));

// 取得單一貼文
router.get('/post/:postId', catchAsync(postControllers.getPost));

// 新增單一貼文
router.post('/post', catchAsync(postControllers.createdPost));

// 編輯單一貼文
router.patch('/post/:postId', catchAsync(postControllers.updatePost));

// 刪除單一貼文
router.delete('/post/postId', catchAsync(postControllers.deletePost));

module.exports = router;
