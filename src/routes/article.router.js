const Router = require('koa-router');

const { checkArticleId } = require('../middlewares/article.middleware');

const {
  createArticle,
  deleteArticle,
  updateArticle,
  updatePublishState,
  findOneArticle,
  findAllArticles
} = require('../controllers/article.controller');

const articleRouter = new Router({ prefix: '/articles' });

articleRouter.post('/', createArticle);

articleRouter.delete('/:id', checkArticleId, deleteArticle);

articleRouter.put('/:id', checkArticleId, updateArticle);

articleRouter.patch('/:id/isPublish', checkArticleId, updatePublishState);

articleRouter.get('/:id', checkArticleId, findOneArticle);

articleRouter.get('/', findAllArticles);

module.exports = articleRouter;