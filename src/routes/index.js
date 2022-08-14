const Router = require('koa-router');
const adminRouter = require('./admin.router');
const articleRouter = require('./article.router');
const categoryRouter = require('./category.router');
const mediaRouter = require('./media.router');

const router = new Router();

router.use(adminRouter.routes());
router.use(categoryRouter.routes());
router.use(articleRouter.routes());
router.use(mediaRouter.routes());

module.exports = router;