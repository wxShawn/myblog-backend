const Router = require('koa-router');

const { checkCategoryId } = require('../middlewares/category.middleware');

const {
  createCategory,
  getCategory,
  getCategoryList,
  deleteCategory,
  updateCategory
} = require('../controllers/category.controller');


const categoryRouter = new Router({ prefix: '/categories' });

categoryRouter.post('/', createCategory);

categoryRouter.delete('/:id', checkCategoryId, deleteCategory);

categoryRouter.put('/:id', checkCategoryId, updateCategory);

categoryRouter.get('/:id', checkCategoryId, getCategory);

categoryRouter.get('/', getCategoryList);

module.exports = categoryRouter;