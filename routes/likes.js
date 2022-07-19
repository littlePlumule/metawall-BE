const express = require('express');
const router = express.Router();
const likeControllers = require('../controllers/likeController');
const { catchAsync } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');
const { checkPostId } = require('../service/checkId');


// 取得按讚列表
router.get('/likes', isAuth, catchAsync(likeControllers.getLikes)
  /**
   * #swagger.tags = ['Likes']
   * #swagger.summary = '取得按讚列表'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '取得按讚列表成功',
      schema: { $ref: '#/definitions/Like' }
    }
    #swagger.responses[400] = {
      description: '取得訂單列表失敗',
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

// 按讚
router.post('/like/:postId', checkPostId, isAuth, catchAsync(likeControllers.addLike)
  /**
   * #swagger.tags = ['Likes']
   * #swagger.summary = '按讚'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '取得按讚列表成功',
      schema: { $ref: '#/definitions/Success' }
    }
    #swagger.responses[400] = {
      description: '取得按讚列表失敗',
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

// 取消按讚
router.delete('/unlike/:postId', checkPostId, isAuth, catchAsync(likeControllers.deleteLike)
  /**
   * #swagger.tags = ['Likes']
   * #swagger.summary = '取消按讚'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '取得按讚列表成功',
      schema: { $ref: '#/definitions/Success' }
    }
    #swagger.responses[400] = {
      description: '取得按讚列表失敗',
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