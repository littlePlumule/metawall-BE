const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { appError } = require('../service/errorHandler');
const httpResponse = require('../service/resHandle');
const { generateSendJWT } = require('../service/auth');
const {
  isNotEmpty,
  isValidPassword,
  isValidNickname,
  isValidEmail,
  isValidGender
} = require('../service/validator');

const users = {
  async signup(req, res, next) {
    const { email, password, nickName } = req.body;

    nickName = nickName ? nickName.trim() : nickName;
    email = email ? email.trim() : email;
    password = password ? password.trim() : password;

    if (!isNotEmpty({ nickName, email, password }).valid) {
      return next(appError(400, 1, isNotEmpty({ nickName, email, password }).msg));
    }

    if (!isValidNickname(nickName).valid) {
      return next(appError(400, 1, isValidNickname(nickName).msg));
    }

    if (!isValidEmail(email).valid) {
      return next(appError(400, 1, isValidEmail(email).msg));
    }

    if (!isValidPassword(password).valid) {
      return next(appError(400, 1, isValidPassword(password).msg));
    }

    const isRegister = await User.findOne({ email }).count();
    if (isRegister !== 0) {
      return next(appError(400, 2, { email: '此 Email 已被註冊，請替換新的 Email' }));
    }

    password = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password,
      nickName
    });

    generateSendJWT(newUser, 201, res);
  },

  async signin(req, res, next) {
    
  },

  async updatePassword(req, res, next) {
    
  },

  async getMyProfile(req, res, next) {
    
  },

  async getOtherProfile(req, res, next) {
    
  },

  async updateProfile(req, res, next) {
    
  }
};

module.exports = users;