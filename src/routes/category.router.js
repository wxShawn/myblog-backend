const Router = require('koa-router');

const { checkCategoryId } = require('../middlewares/category.middleware');

const Auth = require('../middlewares/auth.middleware');

const {
  createCategory,
  getCategory,
  getCategoryList,
  deleteCategory,
  updateCategory
} = require('../controllers/category.controller');


const categoryRouter = new Router({ prefix: '/categories' });

categoryRouter.post('/', new Auth([1]).verifyAuth, createCategory);

categoryRouter.delete('/:id', new Auth([1]).verifyAuth, checkCategoryId, deleteCategory);

categoryRouter.put('/:id', new Auth([1]).verifyAuth, checkCategoryId, updateCategory);

categoryRouter.get('/:id', checkCategoryId, getCategory);

categoryRouter.get('/', getCategoryList);

module.exports = categoryRouter;