const User = require('../models/userModel');
const { appError } = require('../service/errorHandler');
const httpResponse = require('../service/resHandle');

const follows = {
  async getFollows(req, res, next) {
    const list = await User.find({
      _id: req.user.id
    }).populate({
      path: 'followings.user',
      select: 'nickName avatar _id'
    }).select('followings').sort('followings.createdAt');

    httpResponse(res, { list: list[0].followings });
  },

  async addFollow(req, res, next) {
    
  },

  async deleteFollow(req, res, next) {
    
  }
};

module.exports = follows;