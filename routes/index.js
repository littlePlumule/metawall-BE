const usersRouter = require('./user');
const postsRouter = require('./post');
const likesRouter = require('./likes');
const followsRouter = require('./follows');
const commentRouter = require('./comment.js');
const uploadRouter = require('./upload');
const paymentRouter = require('./payment');

module.exports = app => {
  app.use('/meta/user', usersRouter);
  app.use('/meta', postsRouter);
  app.use('/meta', likesRouter);
  app.use('/meta', followsRouter);
  app.use('/meta/comment', commentRouter);
  app.use('/meta/upload', uploadRouter);
  app.use('/meta', paymentRouter);
};
