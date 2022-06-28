const sizeOf = require('image-size');
const { ImgurClient } = require('imgur');
const { appError } = require('../service/errorHandler');
const httpResponse = require('../service/resHandle');

const upload = {
  async uploadImage(req, res, next) {
    if (!req.files?.length) {
      return next(appError(400, 1, { file: '尚未上傳檔案' }));
    }

    const dimensions = sizeOf(req.files[0].buffer);
    if (dimensions.width !== dimensions.height) {
      return next(appError(400, 1, { image: '圖片長寬不是 1:1 的尺寸' }));
    }

    const client = new ImgurClient({
      clientId: process.env.IMGUR_CLIENTID,
      clientSecret: process.env.IMGUR_CLIENT_SECRET,
      refreshToken: process.env.IMGUR_REFRESH_TOKEN
    });

    const response = await client.upload({
      image: req.files[0].buffer.toString('base64'),
      type: 'base64',
      album: process.env.IMGUR_ALBUM_ID
    });

    httpResponse(res, { imgUrl: response.data.link });
  }
};

module.exports = upload;