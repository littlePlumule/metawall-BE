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

    const post = await Post
      .findById(postId)
      .populate({ 
        path: 'comments',
        select: 'editor comment image createdAt'
      });
    httpResponse(res, post);
  },

  async createdPost(req, res, next) {
    let { content, image } = req.body;

    content = content ? content.trim() : content;
    image = image ? image.trim() : image;

    if (!isNotEmpty(content).valid) {
      return next(appError(400, 1, isNotEmpty(content).msg));
    }

    const param = {
      editor: req.user.id,
      content
    };

    if (image) {
      param.image = image;
    }

    const newPost = await Post.create(param);
    httpResponse(res, newPost);
  },

  async updatePost(req, res, next) {
    const { postId } = req.params;
    let { content, image } = req.body;

    content = content ? content.trim() : content;
    image = image ? image.trim() : image;

    if (!isNotEmpty({ content }).valid) {
      return next(appError(400, 1, isNotEmpty({ content }).msg));
    }

    const post = await Post.findById(postId);
    if (post.editor.toString() !== req.user.id) {
      return next(appError(400, 5, { user_id: '您並非發文者，無法修改此貼文' }));
    }

    const param = {
      content
    };

    if (image) {
      param.image = image;
    }

    await Post.findByIdAndUpdate(postId, param);

    const updatePost = await Post.findById(postId);
    httpResponse(res, updatePost);
  },

  async deletePost(req, res, next) {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (post.editor.toString() !== req.user.id) {
      return next(appError(400, 5, { user_id: '您並非發文者，無法修改此貼文' }));
    }

    await Post.findByIdAndDelete(postId);

    httpResponse(res, '刪除成功');
  }
};

module.exports = posts;