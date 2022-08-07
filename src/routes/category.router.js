const Router = require('koa-router');

const { createCategory, getCategory, getCategoryList, deleteCategory, updateCategory } = require('../controllers/category.controller');

const categoryRouter = new Router({ prefix: '/categories' });

categoryRouter.post('/', createCategory);

categoryRouter.delete('/:id', deleteCategory);

categoryRouter.put('/:id', updateCategory);

categoryRouter.get('/:id', getCategory);

categoryRouter.get('/', getCategoryList);

module.exports = categoryRouter;