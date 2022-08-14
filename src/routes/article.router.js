const Router = require('koa-router');

const { checkArticleId } = require('../middlewares/article.middleware');

const Auth = require('../middlewares/auth.middleware');

const {
  createArticle,
  deleteArticle,
  updateArticle,
  updatePublishState,
  findOneArticle,
  findAllArticles
} = require('../controllers/article.controller');

const articleRouter = new Router({ prefix: '/articles' });

articleRouter.post('/', new Auth([1]).verifyAuth, createArticle);

articleRouter.delete('/:id', new Auth([1]).verifyAuth, checkArticleId, deleteArticle);

articleRouter.put('/:id', new Auth([1]).verifyAuth, checkArticleId, updateArticle);

articleRouter.patch('/:id/isPublish', new Auth([1]).verifyAuth, checkArticleId, updatePublishState);

articleRouter.get('/:id', checkArticleId, findOneArticle);

articleRouter.get('/', findAllArticles);

module.exports = articleRouter;