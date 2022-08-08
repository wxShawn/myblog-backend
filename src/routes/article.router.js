const Router = require('koa-router');

const { createArticle } = require('../controllers/article.controller');

const articleRouter = new Router({ prefix: '/articles' });

articleRouter.post('/', createArticle);

articleRouter.delete('/:id', );

articleRouter.put('/:id', );

articleRouter.patch('/:id/isPublish', );

articleRouter.get('/:id', );

articleRouter.get('/', );

module.exports = articleRouter;