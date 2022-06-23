const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// 跨網域套件
const cors = require('cors');

const app = express();

// 連線
require('./connections');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// 路徑
require('./routes')(app);

// 錯誤處理
require('./service/process');
const { errorHandlerMainProcess } = require('./service/errorHandler');
app.use((res, res, next) => {
  res.status(404).send({
    status: false,
    message: '無此頁面'
  });
});
app.use(errorHandlerMainProcess);

module.exports = app;
