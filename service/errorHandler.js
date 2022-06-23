// 自定義 error
/**
 * @decription - 錯誤統一並回傳
 * @param {Number} statusCode 
 * @param {String} errMessage
 * @returns
 */
const appError = (statusCode, errStatus, errMessage) => {
  let status = 0
  switch (errStatus) {
    case 1:
      status = '資料格式錯誤';
      break;

    case 2:
      status = '資料已存在';
      break;

    case 3:
      status = '資料驗證錯誤';
      break;

    case 4:
      status = '您尚未登入';
      break;

    case 5:
      status = '身分不符';
      break;

    default:
      status = '操作錯誤';
      break;
  };

  const error = new Error(status);
  error.statusCode = statusCode;
  // 是否為可預期
  error.isOperational = true;
  error.error = errMessage;
  return error;
};

/**
 * @description - catch 統一管理
 * @param {Function} func - controller function
 * @returns {Next} - 回傳 express next
 */
const catchAsync = func => (req, res, next) => {
  func(req, res, next).catch(error => next(error))
}

// Dev 環境下的錯誤
const resErrorDev = (err, res) => {
  res.status(err.statusCode).send({
    status: 'false',
    message: err.message,
    name: err.name,
    error: err.error,
    statusCode: err.statusCode,
    isOperational: err.isOperational,
    stack: err.stack
  })
};

// Prod 環境下的錯誤
const resErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).send({
      message: err.message
    });
  } else {
    console.error('出現重大錯誤', err);
    res.status(500).send({
      status: 'error',
      message: '系統錯誤，請恰系統管理員'
    });
  }
};

const errorHandlerMainProcess = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // dev 環境
  if (process.env.NODE_ENV === 'dev') {
    return resErrorDev(err, res);
  }

  // prod 環境
  if (err.name === 'ValidationError') {
    err.message = '資料欄位未填寫正確，請重新輸入';
    err.statusCode = 400;
    err.isOperational = true;
    return resErrorProd(err, res);
  }

  if (err.name === 'CastError') {
    err.message = '無此 ID 請重新確認!';
    err.statusCode = 400;
    err.isOperational = true;
    return resErrorProd(err, res);
  }

  if (err.name === 'SyntaxError') {
    err.message = '格式錯誤, 請重新確認!';
    err.statusCode = 400;
    err.isOperational = true;
    return resErrorProd(err, res);
  }

  if (err.code === 11000) {
    err.message = 'Email 已使用, 請重新註冊!'
    err.statusCode = 400;
    err.isOperational = true;
    return resErrorProd(err, res);
  }

  resErrorProd(err, res);
};

module.exports = {
  appError,
  catchAsync,
  resErrorDev,
  resErrorProd,
  errorHandlerMainProcess,
}