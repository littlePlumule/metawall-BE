const Post = require('../models/postModel');
const { appError } = require('../service/errorHandler');
const httpResponse = require('../service/resHandle');
const {
  isNotEmpty,
  isValidPage,
  isValidLimit
} = require('../service/validator');

const posts = {
  async getAllPosts(req, res, next) {
    const timeSort = req.query.sort === 'asc' ? 'createdAt' : '-createdAt';
    const filter = req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    const currentPage = isValidPage(req.query.page);
    const perPage = isValidLimit(req.query.limit);
    const total = await Post.find(filter).count();
    const totalPage = Math.ceil(total / perPage);
    const skip = (currentPage - 1) * perPage;

    if (totalPage > 0 && currentPage > totalPage) {
      return next(appError(400, 1, `請輸入正確頁碼，共有${totalPage}頁`));
    }

    const posts = await Post
      .find(filter)
      .populate({
        path: 'editor',
        select: 'nickName avatar'
      })
      .populate({
        path: 'comments',
        select: 'editor comment image createdAt'
      })
      .sort(timeSort)
      .skip(skip);

    httpResponse(res, {
      page: {
        currentPage,
        perPage,
        total,
        totalPage
      },
      list: posts
    });
  },

  async getPosts(req, res, next) {
    const timeSort = req.query.sort === 'asc' ? 'createdAt' : '-createdAt';
    const filter = req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};
    filter.editor = req.params.userId;
    const currentPage = isValidPage(req.query.page);
    const perPage = isValidLimit(req.query.limit);
    const total = await Post.find(filter).count();
    const totalPage = Math.ceil(total / perPage);
    const skip = (currentPage - 1) * perPage;

    if (totalPage > 0 && currentPage > totalPage) {
      return next(appError(400, 1, `請輸入正確頁碼，共有${totalPage}頁`));
    }

    const posts = await Post
      .find(filter)
      .populate({
        path: 'editor',
        select: 'nickName avatar'
      })
      .populate({
        path: 'comments',
        select: 'editor comment image createdAt'
      })
      .sort(timeSort)
      .skip(skip);

    httpResponse(res, {
      page: {
        currentPage,
        perPage,
        total,
        totalPage
      },
      list: posts
    });
  },

  async getPost(req, res, next) {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    httpResponse(res, post);
  },

  async createdPost(req, res, next) {
    
  },

  async updatePost(req, res, next) {
    
  },

  async deletePost(req, res, next) {
    
  }
};

module.exports = posts;