const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postController');
const { catchAsync } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');
const { checkPostId, checkUserId } = require('../service/checkId');

// 取得所有貼文 
router.get('/posts', isAuth, catchAsync(postControllers.getAllPosts)
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '取得所有貼文'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.parameters['q'] = {
      in: 'query',
      description: '關鍵字',
      type: 'string',
    }
    #swagger.parameters['sort'] = {
      in: 'query',
      description: '排序方式，desc 為新至舊，asc 為舊至新，hot 為最熱門',
      type: 'string',
    }
    #swagger.parameters['page'] = {
      in: 'query',
      description: '當前頁面',
      type: 'number',
    }
    #swagger.parameters['limit'] = {
      in: 'query',
      description: '一頁顯示資料筆數',
      type: 'number',
    }
    #swagger.responses[200] = {
      description: '取得所有貼文成功',
      schema: { $ref: '#/definitions/getPosts' }
    }
    #swagger.responses[400] = {
      description: '取得所有貼文失敗',
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

// 取得個人所有貼文 
router.get('/posts/:userId', checkUserId, isAuth, catchAsync(postControllers.getPosts)
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '取得個人所有貼文'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.parameters['q'] = {
      in: 'query',
      description: '關鍵字',
      type: 'string',
    }
    #swagger.parameters['sort'] = {
      in: 'query',
      description: '排序方式，desc 為新至舊，asc 為舊至新，hot 為最熱門',
      type: 'string',
    }
    #swagger.parameters['page'] = {
      in: 'query',
      description: '當前頁面',
      type: 'number',
    }
    #swagger.parameters['limit'] = {
      in: 'query',
      description: '一頁顯示資料筆數',
      type: 'number',
    }
    #swagger.responses[200] = {
      description: '取得個人所有貼文成功',
      schema: { $ref: '#/definitions/getPosts' }
    }
    #swagger.responses[400] = {
      description: '取得個人所有貼文失敗',
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

// 取得單一貼文
router.get('/post/:postId', checkPostId, isAuth, catchAsync(postControllers.getPost)
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '取得單一貼文'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '取得單一貼文成功',
      schema: { $ref: '#/definitions/getPost' }
    }
    #swagger.responses[400] = {
      description: '取得單一貼文失敗',
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

// 新增單一貼文
router.post('/post', isAuth, catchAsync(postControllers.createdPost)
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '新增單一貼文'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.parameters['request.body'] = {
      in: 'body',
      required: true,
      description: '新增單一貼文資料',
      schema: {
        "$content": "test"
      }
    }
    #swagger.responses[200] = {
      description: '新增單一貼文成功',
      schema: { $ref: '#/definitions/Post' }
    }
    #swagger.responses[400] = {
      description: '新增單一貼文失敗',
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

// 編輯單一貼文
router.patch('/post/:postId', checkPostId, isAuth, catchAsync(postControllers.updatePost)
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '編輯單一貼文'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.parameters['request.body'] = {
      in: 'body',
      required: true,
      description: '編輯單一貼文資料',
      schema: {
        "$content": "test"
      }
    }
    #swagger.responses[200] = {
      description: '編輯單一貼文成功',
      schema: { $ref: '#/definitions/Post' }
    }
    #swagger.responses[400] = {
      description: '編輯單一貼文失敗',
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

// 刪除單一貼文
router.delete('/post/:postId', checkPostId, isAuth, catchAsync(postControllers.deletePost)
  /**
   * #swagger.tags = ['Posts']
   * #swagger.summary = '刪除單一貼文'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.responses[200] = {
      description: '刪除單一貼文成功',
      schema: { $ref: '#/definitions/Success' }
    }
    #swagger.responses[400] = {
      description: '刪除單一貼文失敗',
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
