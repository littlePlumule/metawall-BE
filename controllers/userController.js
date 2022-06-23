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
    const { email, password } = req.body;

    email = email ? email.trim() : email;
    password = password ? password.trim() : password;

    if (!isNotEmpty({ email, password }).valid) {
      return next(appError(400, 1, isNotEmpty({ email, password }).msg));
    }

    if (!isValidEmail(email).valid) {
      return next(appError(400, 1, isValidEmail(email).msg));
    }

    if (!isValidPassword(password).valid) {
      return next(appError(400, 1, isValidPassword(password).msg));
    }

    const user = await User.findOne({ email }).select('+passwrod');

    if (!user) {
      return next(appError(400, 3, { email: '帳號、密碼不正確' }));
    }

    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return next(appError(400, 3, { email: '帳號、密碼不正確' }));
    }

    generateSendJWT(user, 200, res);
  },

  async updatePassword(req, res, next) {
    const { password, confirmPassword } = req;

    password = password ? password.trim() : password;
    confirmPassword = confirmPassword ? confirmPassword.trim() : confirmPassword;

    if (!isNotEmpty({ password, confirmPassword }).valid) {
      return next(appError(400, 1, isNotEmpty({ password, confirmPassword }).msg));
    }

    if (password !== confirmPassword) {
      return next(appError(400, 1, { confirmPassword: '密碼不一致' }));
    }

    if (!isValidPassword(password).valid) {
      return next(appError(400, 1, isValidPassword(password).msg));
    }

    const newPassword = await bcrypt.hash(password, 12);

    const user = await User.findByIdAndUpdate(req.user.id, { password: newPassword });

    generateSendJWT(user, 200, res);
  },

  async getMyProfile(req, res, next) {
    const profile = await User.findById(req.user.id);
    httpResponse(res, profile);
  },

  async getOtherProfile(req, res, next) {
    const user = await User.findById(req.params.userId);
    httpResponse(res, user);
  },

  async updateProfile(req, res, next) {
    const { nickName, gender, avatar } = req.body;

    nickName = nickName ? nickName.trim() : nickName;
    gender = gender ? gender.trim() : gender;
    avatar = avatar ? avatar.trim() : avatar;

    if (!isNotEmpty({ nickName, gender }).valid) {
      return next(appError(400, 1, isNotEmpty({ nickName, gender }).msg));
    }

    if (!isValidNickname(nickName).valid) {
      return next(appError(400, 1, isValidNickname(nickName).msg));
    }

    if (!isValidGender(gender).valid) {
      return next(appError(400, 1, isValidGender(gender).msg));
    }

    const profile = {
      nickName,
      gender
    }

    if (avatar) profile.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.user.id, profile, {
      new: true,
      runValidators: true
    });

    httpResponse(res, user);
  }
};

module.exports = users;