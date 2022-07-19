const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');
const { isAuth } = require('../service/auth');
const { catchAsync } = require('../service/errorHandler');
const { checkUserId } = require('../service/checkId');

// 註冊
router.post('/register', catchAsync(userControllers.signup)
  /**
   * #swagger.tags = ['Login']
   * #swagger.summary = '註冊'
    #swagger.parameters['request.body'] = {
      in: 'body',
      required: true,
      description: '註冊資料',
      schema: {
        "$email": "test@gmail.com",
        "$password": "a1234567",
        "$nickName": "暱稱"
      }
    }
    #swagger.responses[201] = {
      description: '註冊成功',
      schema: { $ref: '#/definitions/Sign' }
    }
    #swagger.responses[400] = {
      description: '註冊失敗',
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

// 登入
router.post('/login', catchAsync(userControllers.signin)
  /**
   * #swagger.tags = ['Login']
   * #swagger.summary = '登入'
    #swagger.parameters['request.body'] = {
      in: 'body',
      required: true,
      description: '登入資料',
      schema: {
        "email": "test@gmail.com",
        "password": "a1234567"
      }
    }
    #swagger.responses[201] = {
      description: '登入成功',
      schema: { $ref: '#/definitions/Sign' }
    }
    #swagger.responses[400] = {
      description: '登入失敗',
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

// 忘記密碼
router.post('/forgetPassword', catchAsync(userControllers.forgetPassword)
  /**
   * #swagger.tags = ['Login']
   * #swagger.summary = '忘記密碼'
    #swagger.parameters['request.body'] = {
      in: 'body',
      required: true,
      description: '忘記密碼資料',
      schema: {
        "$email": "test@gmail.com"
      }
    }
    #swagger.responses[200] = {
      description: '成功',
      schema: { $ref: '#/definitions/Mailer' }
    }
    #swagger.responses[400] = {
      description: '失敗',
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

// 驗證碼
router.post('/verification/:userId', catchAsync(userControllers.verification)
  /**
   * #swagger.tags = ['Login']
   * #swagger.summary = '驗證碼'
    #swagger.parameters['request.body'] = {
      in: 'body',
      required: true,
      description: '驗證碼資料',
      schema: {
        "$verification": "12345"
      }
    }
    #swagger.responses[201] = {
      description: '驗證成功',
      schema: { $ref: '#/definitions/Sign' }
    }
    #swagger.responses[400] = {
      description: '驗證失敗',
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

// 修改密碼
router.patch('/password', isAuth, catchAsync(userControllers.updatePassword)
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = '修改密碼'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.parameters['request.body'] = {
      in: 'body',
      required: true,
      description: '修改密碼資料',
      schema: {
        "$password": "a1234567",
        "$confirmPassword": "a1234567"
      }
    }
    #swagger.responses[201] = {
      description: '修改密碼成功',
      schema: { $ref: '#/definitions/Sign' }
    }
    #swagger.responses[400] = {
      description: '修改密碼失敗',
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

// 取得個人頁面
router.get('/profile', isAuth, catchAsync(userControllers.getMyProfile)
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = '取得個人頁面'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '取得個人資料成功',
      schema: { $ref: '#/definitions/User' }
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

// 取得他人個人頁面
router.get('/profile/:userId', checkUserId, isAuth, catchAsync(userControllers.getOtherProfile)
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = '取得他人個人頁面'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '取得個人資料成功',
      schema: { $ref: '#/definitions/User' }
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

// 編輯個人資料
router.patch('/profile', isAuth, catchAsync(userControllers.updateProfile)
  /**
   * #swagger.tags = ['Users']
   * #swagger.summary = '編輯個人資料'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.parameters['request.body'] = {
      in: 'body',
      required: true,
      description: '編輯個人資料',
      schema: {
        "$nickName": "test",
        "$gender": "male",
      }
    }
    #swagger.responses[200] = {
      description: '編輯個人資料成功',
      schema: { $ref: '#/definitions/User' }
    }
    #swagger.responses[400] = {
      description: '編輯個人資料失敗',
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
