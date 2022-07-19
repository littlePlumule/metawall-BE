const nodemailer = require('nodemailer');
const httpResponse = require('./resHandle');
const { appError } = require('./errorHandler');

const mailer = (res, next, user, randomNum) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.MAILER_USER,
      clientId: process.env.MAILER_CLIENTID,
      clientSecret: process.env.MAILER_CLIENT_SECRET,
      refreshToken: process.env.MAILER_REFRESH_TOKEN,
      accessToken: process.env.MAILER_ACCESS_TOKEN
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const options = {
    from: process.env.MAILER_USER,
    to: user.email,
    subject: 'Metawall - 忘記密碼',
    html: `
    <h2>密碼重置</h2> 
    <p> ${user.nickName}，您好: <br />
      要重新設定您的密碼，請在網頁上輸入以下驗證碼<br />
      驗證成功後，即可設定您的新密碼<br />
      驗證碼: <span style="color:red">${randomNum}</span><br />
      如果你並未要求重設密碼，你可以略過這則訊息。
    </p>
    <p style=color:gray>本郵件請勿直接回覆。</p>
    `
  };

  transporter.sendMail(options, function(error, info) {
    if(!error) {
      httpResponse(res, '請至 Email 查收信件');
    } else {
      //請稍後重試或聯絡管理員
      return next(appError(400, 3, '請稍後重試或聯絡管理員'));
    }
  });
}

module.exports = mailer
