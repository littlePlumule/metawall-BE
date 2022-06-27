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
    
  },

  async deleteLike(req, res, next) {
    
  }
};

module.exports = likes;