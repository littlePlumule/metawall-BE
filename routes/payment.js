const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { isAuth } = require('../service/auth');
const { catchAsync } = require('../service/errorHandler');
const { checkPostId } = require('../service/checkId');

// 新增一筆訂單
router.post('/createOrder/:postId', checkPostId, isAuth, catchAsync(paymentController.createOrder)
  /**
   * #swagger.tags = ['Orders']
   * #swagger.summary = '新增一筆訂單'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.consumes = ['application/x-www-form-urlencoded']
    #swagger.parameters['form'] = {
      in: 'body',
      required: true,
      description: '表單資料',
      schema: {
        "$Email": "test@gmail.com",
        "$Amt": 1000,
        "$ItemDesc": "test"
      }
    }
    #swagger.responses[200] = {
      description: '新增一筆訂單成功',
      schema: { $ref: '#/definitions/createOrder' }
    }
    #swagger.responses[400] = {
      description: '新增一筆訂單失敗',
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

// 藍新金流回傳
router.post('/notify', catchAsync(paymentController.notify));

// 藍新金流轉址
router.post('/return', catchAsync(paymentController.return));

// 取得訂單列表
router.get('/orders', isAuth, catchAsync(paymentController.getOrders)
  /**
   * #swagger.tags = ['Orders']
   * #swagger.summary = '取得訂單列表'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '取得訂單列表成功',
      schema: { $ref: '#/definitions/getOrders' }
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

// 取得單筆訂單
router.get('/order/:orderNo', isAuth, catchAsync(paymentController.getOrder)
  /**
   * #swagger.tags = ['Orders']
   * #swagger.summary = '取得單筆訂單'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '新增一筆訂單成功',
      schema: { $ref: '#/definitions/getOrder' }
    }
    #swagger.responses[400] = {
      description: '新增一筆訂單失敗',
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