const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
  editor: {
    type: mongoose.Schema.ObjectId,
    ref: 'user',
    required: [true, '請填寫作者 ID']
  },
  content: {
    type: String,
    required: [true, '請填寫貼文內容']
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
    default: Date.now
  },
  likes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'user'
  }],
}, {
  versionKey: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
  id: false
})

postsSchema.virtual('comments', {
  ref: 'comment',
  foreignField: 'post',
  localField: '_id'
})

const Post = mongoose.model('post', postsSchema)

module.exports = Post