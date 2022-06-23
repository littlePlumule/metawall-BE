const jwt = require('jsonwebtoken');
const { appError, catchAsync } = require('../service/errorHandler');
const User = require('../models/userModel');

// 產生 JWT token
const generateSendJWT = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });

  user.password = undefined;
  res.status(statusCode).send({
    status: 'success',
    user: {
      token,
      nickName: user.nickName
    }
  })
};

const isAuth = catchAsync(async (req, res, next) => {
  // 確認 token 是否存在
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return next(appError(401, '你尚未登入'))

  // 驗證 token 正確性
  const decoded = await new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      err
      ? reject(next(appError(401, 'token 驗證錯誤')))
      : resolve(payload)
    });
  });
  
  const currentUser = await User.findById(decoded.id);
  req.user = currentUser;
  next();
});

module.exports = {
  generateSendJWT,
  isAuth
}