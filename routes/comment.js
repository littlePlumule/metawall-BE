const express = require('express');
const router = express.Router();
const commentControllers = require('../controllers/commentController');
const { catchAsync } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');
const { checkPostId, checkCommentId } = require('../service/checkId');

// 新增單一留言
router.post('/:postId', checkPostId, isAuth, catchAsync(commentControllers.addComment)
  /**
   * #swagger.tags = ['Comments']
   * #swagger.summary = '新增單一留言'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.parameters['request.body'] = {
      in: 'body',
      required: true,
      description: '新增單一留言資料',
      schema: {
        "$comment": "test"
      }
    }
    #swagger.responses[200] = {
      description: '新增單一留言成功',
      schema: { $ref: '#/definitions/createComment' }
    }
    #swagger.responses[400] = {
      description: '新增單一留言失敗',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[404] = {
      description: '無此路由',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error' }
    }
   */
);

// 編輯單一留言
router.patch('/:commentId', checkCommentId, isAuth, catchAsync(commentControllers.updateCommnet)
  /**
   * #swagger.tags = ['Comments']
   * #swagger.summary = '編輯單一留言'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.parameters['request.body'] = {
      in: 'body',
      required: true,
      description: '編輯單一留言資料',
      schema: {
        "$comment": "test"
      }
    }
    #swagger.responses[200] = {
      description: '編輯單一留言成功',
      schema: { $ref: '#/definitions/updateComment' }
    }
    #swagger.responses[400] = {
      description: '編輯單一留言失敗',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[404] = {
      description: '無此路由',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error' }
    }
   */
);

// 刪除單一留言
router.delete('/:commentId', checkCommentId, isAuth, catchAsync(commentControllers.deleteComment)
  /**
   * #swagger.tags = ['Comments']
   * #swagger.summary = '刪除單一留言'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '刪除單一留言成功',
      schema: { $ref: '#/definitions/Success' }
    }
    #swagger.responses[400] = {
      description: '刪除單一留言失敗',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[404] = {
      description: '無此路由',
      schema: { $ref: '#/definitions/Error' }
    }
    #swagger.responses[500] = {
      description: '系統錯誤',
      schema: { $ref: '#/definitions/Error' }
    }
   */
);

module.exports = router;