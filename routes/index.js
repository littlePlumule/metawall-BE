const usersRouter = require('./user');
const postsRouter = require('./follows');
const likesRouter = require('./likes');
const followsRouter = require('./follows');
const commentRouter = require('./comment.js');

module.exports = app => {
  app.use('/meta/user', usersRouter);
  app.use('/meta', postsRouter);
  app.use('/meta', likesRouter);
  app.use('/meta', followsRouter);
  app.use('/meta/comment', commentRouter);
};
