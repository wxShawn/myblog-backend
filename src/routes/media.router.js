const path = require('path')
const Router = require('koa-router');
const koaBody = require('koa-body');

const { uploadMedia } = require('../controllers/media.controller');

const mediaRouter = new Router({ prefix: '/media' });

const kb = koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, "../uploads/"), // 文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 100 * 1024 * 1024, // 文件上传大小限制
  }
});

mediaRouter.post('/', kb, uploadMedia);

mediaRouter.delete('/:id', );

mediaRouter.put('/:id', );

mediaRouter.get('/:id', );

mediaRouter.get('/', );

module.exports = mediaRouter;