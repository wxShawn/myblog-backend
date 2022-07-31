const bcrypt = require('bcryptjs');
const adminService = require('../services/admin.service');
const { nameRegExp, emailRegExp, passwordRegExp, idRegExp, verifyCodeRegexp } = require('../utils/regexp');
const res = require('../utils/res');

class AdminMiddleware {
  // 检查注册信息
  async checkRegisterParams(ctx, next) {
    const { name, email, password, roleId } = ctx.request.body;
    if (!nameRegExp.test(name) || !emailRegExp.test(email) || !passwordRegExp.test(password) || !idRegExp.test(roleId)) {
      return res.error(ctx, {
        status: 400,
        msg: '注册信息格式错误',
        result: '',
      });
    }
    if (await adminService.findOneByEmail(email)) {
      return res.error(ctx, {
        status: 400,
        msg: '邮箱已被注册',
        result: '',
      });
    }

    await next();
  }
  

  // 检查密码登录信息
  async checkPwdLoginParams(ctx, next) {
    const { email, password } = ctx.request.body;
    if (!emailRegExp.test(email) || !passwordRegExp.test(password)) {
      return res.error(ctx, {
        status: 400,
        msg: '邮箱或密码错误',
        result: '',
      });
    }
    const sqlData = await adminService.findOneByEmail(email);
    if (!sqlData) {
      return res.error(ctx, {
        status: 400,
        msg: '用户尚未注册',
        result: '',
      });
    }
    ctx.state = sqlData;
    await next();
  }


  // 检查邮箱验证码登录信息
  async checkVerifyCodeLoginParams(ctx, next) {
    const { email, verifyCode } = ctx.request.body;
    if (!emailRegExp.test(email) || !verifyCodeRegexp.test(verifyCode)) {
      return res.error(ctx, {
        status: 400,
        msg: '邮箱或验证码错误',
        result: '',
      });
    }
    const sqlData = await adminService.findOneByEmail(email);
    if (!sqlData) {
      return res.error(ctx, {
        status: 400,
        msg: '用户尚未注册',
        result: '',
      });
    }
    ctx.state = sqlData;
    await next();
  }


  // 加密密码
  async cryptPassword(ctx, next) {
    const { password } = ctx.request.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hashPassword;
    await next();
  }


  // 验证登录密码
  async verifyPassword(ctx, next) {
    const { password } = ctx.request.body;
    const sqlData = ctx.state;
    if (!bcrypt.compareSync(password, sqlData.password)) {
      return res.error(ctx, {
        status: 400,
        msg: '邮箱或密码错误',
        result: '',
      });
    }

    await next();
  }

  // 检查用户是否存在
  async checkAdminExist(ctx, next) {
    const { email } = ctx.request.query;
    if (!email) {
      return res.error(ctx, {
        status: 400,
        msg: '未收到email参数',
        result: ''
      });
    }
    if (!emailRegExp.test(email)) {
      return res.error(ctx, {
        status: 400,
        msg: '邮箱格式不正确',
        result: { email },
      });
    }
    const sqlData = await adminService.findOneByEmail(email);
    if (!sqlData) {
      return res.error(ctx, {
        status: 404,
        msg: '该邮箱未注册',
        result: { email },
      });
    }
    // 将信息保存至 ctx.state
    ctx.state = sqlData;
    await next();
  }

}

module.exports = new AdminMiddleware();