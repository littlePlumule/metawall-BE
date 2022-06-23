const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userController');
const { catchAsync } = require('../service/errorHandler');

// 註冊
router.post('/register', catchAsync(userControllers.signup));

// 登入
router.post('/login', catchAsync(userControllers.signin));

// 修改密碼
router.patch('/password', catchAsync(userControllers.updatePassword));

// 取得個人頁面
router.get('/profile', catchAsync(userControllers.getMyProfile));

// 取得他人個人頁面
router.get('/profile/:userId', catchAsync(userControllers.getOtherProfile));

// 編輯個人資料
router.patch('/profile', catchAsync(userControllers.updateProfile));

module.exports = router;
