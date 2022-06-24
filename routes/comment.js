const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/commentController');
const { catchAsync } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');
const { checkPostId, checkCommentId } = require('../service/checkId');

// 新增單一留言
router.post('/:postId', checkPostId, isAuth, catchAsync(commentControllers.addComment));

// 編輯單一留言
router.patch('/:commentId', checkCommentId, isAuth, catchAsync(commentControllers.updateCommnet));

// 刪除單一留言
router.delete('/:commentId', checkCommentId, isAuth, catchAsync(commentControllers.deleteComment));

module.exports = router;