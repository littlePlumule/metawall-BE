const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/commentController');
const { catchAsync } = require('../service/errorHandler');

// 新增單一留言
router.post('/', catchAsync(commentControllers.addComment));

// 編輯單一留言
router.patch('/:commentId', catchAsync(commentControllers.updateCommnet));

// 刪除單一留言
router.delete('/:commentId', catchAsync(commentControllers.deleteComment));

module.exports = router;