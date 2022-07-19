const swaggerAutogen = require('swagger-autogen')();
const definitions = require('./swagger-definitions');

const doc = {
  info: {
    title: 'Metawall API',
    description: 'Metawall API 文件'
  },
  host: 'infinite-tundra-37613.herokuapp.com',
  schemas: ['https'],
  tags: [
    { name: "Login", description: "登入相關"},
    { name: "Users", description: "會員相關"},
    { name: "Posts", description: "貼文相關"},
    { name: "Comments", description: "留言相關"},
    { name: "Follows", description: "追蹤相關"},
    { name: "Likes", description: "按讚相關"},
    { name: "Upload", description: "上傳檔案相關"},
    { name: "Orders", description: "訂單相關"},
  ],
  definitions,
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      in: "headers",
      name: "Authorization",
      description: "JWT Token"
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);