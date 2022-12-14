const bcrypt = require('bcryptjs');
const adminService = require('../services/admin.service');
const res = require('../utils/res');
const paramsValidator = require('../utils/paramsValidator');

class AdminMiddleware {
  // 检查注册信息
  async checkRegisterParams(ctx, next) {
    const { name, email, password, roleId } = ctx.request.body;
    const errorList = paramsValidator.validate(
      { adminName: name, email, password, id: roleId },
      ['name', 'email', 'password', 'id']
    );
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
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
    const errorList = paramsValidator.validate({ email, password });
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
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
    const errorList = paramsValidator.validate({ email, verifyCode });
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
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
    console.log(bcrypt.compareSync(password, sqlData.password));
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
    const errorList = paramsValidator.validate({ email });
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
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

  // 检查修改密码的相关参数
  async checkUpdatePwdParams(ctx, next) {
    const { email, verifyCode, password } = ctx.request.body;
    const errorList = paramsValidator.validate({ email, verifyCode, password });
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
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
    // 将信息保存至 ctx.state
    ctx.state = sqlData;
    await next();
  }

}

module.exports = new AdminMiddleware();