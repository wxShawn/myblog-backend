const Router = require('koa-router');

const { register, login } = require('../controllers/admin.controller');
const { sendVerifyCode } = require('../controllers/emailVerify.controller');

const {
  checkRegisterParams,
  checkPwdLoginParams,
  checkVerifyCodeLoginParams,
  cryptPassword,
  verifyPassword,
  checkAdminExist,
} = require('../middlewares/admin.middleware');
const { verifyEmailCode } = require('../middlewares/emailVerify.middleware');

const adminRouter = new Router({ prefix: '/admins' });
// 注册
adminRouter.post('/register', checkRegisterParams, cryptPassword, register);
// 密码登录
adminRouter.post('/login', checkPwdLoginParams, verifyPassword, login);
// 邮箱验证码登录
adminRouter.post('/login/email-code', checkVerifyCodeLoginParams, verifyEmailCode, login);
// 获取登录邮箱验证码
adminRouter.get('/login/email-code', checkAdminExist, sendVerifyCode);

adminRouter.delete('/', );

adminRouter.put('/', );

adminRouter.get('/', );

module.exports = adminRouter;