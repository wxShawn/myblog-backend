const Router = require('koa-router');
const adminRouter = require('./admin.router');
const categoryRouter = require('./category.router');

const router = new Router();

router.use(adminRouter.routes());
router.use(categoryRouter.routes());

module.exports = router;