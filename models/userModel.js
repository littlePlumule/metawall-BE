const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: [true, '請填寫作者 ID'],
    minlength: [2, '暱稱至少 2 個字元以上']
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  },
  avatar: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: [true, '請填寫 email'],
    unique: true,
    lowercase: true,
    select: false
  },
  password: {
    type: String,
    required: [true, '請填寫密碼'],
    minlength: [8, '密碼至少 8 個字元以上'],
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  },
  followers: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  following: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
}, {versionKey: false})

const User = mongoose.model('user', userSchema)

module.exports = User