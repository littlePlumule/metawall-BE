const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  editor: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, '請填寫作者 ID']
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'post',
    required: [true, '請填寫貼文 ID']
  },
  comment: {
    type: String,
    required: [true, '"請填寫留言內容']
  },
  image: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
}, {versionKey: false});

commentSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'user',
    select: 'nickName avatar createdAt'
  });

  next()
})

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment