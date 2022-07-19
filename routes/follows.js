const express = require('express');
const router = express.Router();
const followControllers = require('../controllers/followController');
const { catchAsync } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');
const { checkUserId } = require('../service/checkId');

// 取得個人追蹤名單
router.get('/follows', isAuth, catchAsync(followControllers.getFollows)
  /**
   * #swagger.tags = ['Follows']
   * #swagger.summary = '取得個人追蹤名單'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '取得個人追蹤名單成功',
      schema: { $ref: '#/definitions/Follow' }
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

// 追蹤
router.post('/follow/:userId', checkUserId, isAuth, catchAsync(followControllers.addFollow)
  /**
   * #swagger.tags = ['Follows']
   * #swagger.summary = '追蹤'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '追蹤成功',
      schema: { $ref: '#/definitions/Success' }
    }
    #swagger.responses[400] = {
      description: '追蹤失敗',
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

// 取消追蹤
router.delete('/unfollow/:userId', checkUserId, isAuth, catchAsync(followControllers.deleteFollow)
  /**
   * #swagger.tags = ['Follows']
   * #swagger.summary = '取消追蹤'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '取消追蹤成功',
      schema: { $ref: '#/definitions/Success' }
    }
    #swagger.responses[400] = {
      description: '取消追蹤失敗',
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
