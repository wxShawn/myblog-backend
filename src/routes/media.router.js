const path = require('path')
const Router = require('koa-router');
const koaBody = require('koa-body');

const { uploadMedia, destroyMedia, updateMedia, findAllMedia, syncDataBase } = require('../controllers/media.controller');

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

mediaRouter.delete('/:id', destroyMedia);

mediaRouter.put('/:id', updateMedia);

mediaRouter.get('/:id', );

mediaRouter.get('/images', findAllMedia('image'));
mediaRouter.get('/audios', findAllMedia('audio'));
mediaRouter.get('/videos', findAllMedia('video'));

// 同步数据库文件
mediaRouter.post('/sync-database', syncDataBase);

module.exports = mediaRouter;