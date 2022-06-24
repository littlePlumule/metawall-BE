const mongoose = require('mongoose');
const { appError } = require('./errorHandler');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModels');

const checkUserId = async (req, res, next) => {
  const { userId } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(userId);
  if (!isValid) {
    return next(appError(400, 3, 'ID 格式錯誤，請重新確認'));
  }
  const user = await User.findById(userId);
  if (!user) {
    return next(appError(400, 3, '無此用戶'));
  }
  next()
}

const checkPostId = async (req, res, next) => {
  const { postId } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(postId);
  if (!isValid) {
    return next(appError(400, 3, 'ID 格式錯誤，請重新確認'));
  }
  const post = await Post.findById(postId);
  if (!post) {
    return next(appError(400, 3, '無此篇貼文'));
  }
  next()
}

const checkCommentId = async (req, res, next) => {
  const { commentId } = req.params;
  const isValid = mongoose.Types.ObjectId.isValid(commentId);
  if (!isValid) {
    return next(appError(400, 3, 'ID 格式錯誤，請重新確認'));
  }
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(appError(400, 3, '無此留言'));
  }
  next()
}

module.exports = {
  checkUserId,
  checkPostId,
  checkCommentId
}