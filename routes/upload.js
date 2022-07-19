const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const { catchAsync } = require('../service/errorHandler');
const { isAuth } = require('../service/auth');
const upload = require('../service/image');

// 上傳圖片
router.post('/', upload, isAuth, catchAsync(uploadController.uploadImage)
  /**
   * #swagger.tags = ['Upload']
   * #swagger.summary = '上傳圖片'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.consumes = ['multipart/form-data']
    #swagger.parameters['files'] = {
      in: 'formData',
      required: true,
      description: '圖片檔案',
      type: 'file',
      required: 'true',
    }
    #swagger.responses[200] = {
      description: '上傳圖片成功',
      schema: { $ref: '#/definitions/upload' }
    }
    #swagger.responses[400] = {
      description: '上傳圖片失敗',
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