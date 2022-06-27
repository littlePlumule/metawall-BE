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
    if (req.user.id === req.params.userId) {
      return next(appError(401, 1, { userId: '您無法追蹤自己' }));
    }

    await User.updateOne({
      _id: req.user.id,
      'followings.user': { $ne: req.params.userId }
    }, {
      $addToSet: { followings: { user: req.params.userId } }
    });

    await User.updateOne({
      _id: req.params.userId,
      'followers.user': { $ne: req.user.id }
    }, {
      $addToSet: { followers: { user: req.user.id } }
    });    

    httpResponse(res, '追蹤成功')
  },

  async deleteFollow(req, res, next) {
    
  }
};

module.exports = follows;