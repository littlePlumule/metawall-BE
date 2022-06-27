const Post = require('../models/postModel');
const httpResponse = require('../service/resHandle');

const likes = {
  async getLikes(req, res, next) {
    const list = await Post.find({
      likes: {
        $in: [req.user.id]
      }
    }).populate({
      path: 'editor',
      select: 'nickName avatar _id'
    });

    httpResponse(res, list);
  },

  async addLike(req, res, next) {
    await Post.findByIdAndUpdate(req.params.postId, {
      $addToSet: {
        likes: req.user.id
      }
    });

    httpResponse(res, '按讚成功');
  },

  async deleteLike(req, res, next) {
    await Post.findByIdAndUpdate(req.params.postId, {
      $pull: {
        likes: req.user.id
      }
    });

    httpResponse(res, '取消按讚成功');
  }
};

module.exports = likes;