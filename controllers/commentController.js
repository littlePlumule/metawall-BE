const Comment = require('../models/commentModels');
const { appError } = require('../service/errorHandler');
const httpResponse = require('../service//resHandle');
const { isNotEmpty } = require('../service/validator');

const comments = {
  async addComment(req, res, next) {
    let { comment, image } = req.body;
    const { postId } = req.params;

    comment = comment ? comment.trim() : comment;
    image = image ? image.trim() : image;

    if (!isNotEmpty({ comment }).valid) {
      return next(appError(400, 1, isNotEmpty({ comment }).msg));
    }

    const param = {
      editor: req.user.id,
      post: postId,
      comment,
    };

    if (image) {
      param.image = image;
    }

    const newComment = await Comment.create(param);
    httpResponse(res, newComment);
  },

  async updateCommnet(req, res, next) {
    let { comment, image } = req.body;
    const { commentId } = req.params;

    comment = comment ? comment.trim() : comment;
    image = image ? image.trim() : image;

    if (!isNotEmpty({ comment }).valid) {
      return next(appError(400, 1, isNotEmpty({ comment }).msg));
    }

    const material = await Comment.findById(commentId);
    if (material.editor._id.toString() !== req.user.id) {
      return next(appError(400, 5, { user_id: '您並非留言者，無法修改此留言' }));
    }

    const param = {
      comment
    };

    if (image) {
      param.image = image;
    }

    await Comment.findByIdAndUpdate(commentId, param);

    const updateComment = await Comment.findById(commentId);
    httpResponse(res, updateComment);
  },

  async deleteComment(req, res, next) {
    
  }
};

module.exports = comments;