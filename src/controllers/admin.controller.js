const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const adminService = require("../services/admin.service");
const paramsValidator = require('../utils/paramsValidator');
const res = require('../utils/res');

class AdminController {
  // 注册
  async register(ctx) {
    const { name, email, password, roleId } = ctx.request.body;
    const sqlData = await adminService.create({ name, email, password, roleId });
    return res.success(ctx, {
      status: 200,
      msg: '注册成功',
      result: {
        name: sqlData.name,
        email: sqlData.email,
        roleId: sqlData.roleId,
      },
    });
  }


  // 登录
  async login(ctx) {
    const { password, ...data } = ctx.state;
    const { id, roleId } = data;
    return res.success(ctx, {
      status: 200,
      msg: '登录成功',
      result: {
        adminInfo: data,
        jwt: jwt.sign({ id, roleId }, JWT_SECRET, {expiresIn: '1h'}),
      },
    })
  }

  // 获取个人信息
  async getPersonalInfo(ctx) {
    const info = ctx.state.requester;
    return res.success(ctx, {
      status: 200,
      msg: 'ok',
      result: info,
    });
  }

  // 更新个人信息
  async updatePersonalInfo(ctx) {
    const { id } = ctx.state.requester;
    const { name, email } = ctx.request.body;
    const errorList = paramsValidator.validate(
      { adminName: name, email: email },
      ['name', 'email']
    );
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await adminService.update(id, name, email);
    if (result[0] != 1) {
      return res.error(ctx, {
        status: 500,
        msg: '更新失败',
        result: '',
      });
    }
    return res.success(ctx, {
      status: 200,
      msg: '更新成功',
      result: '',
    })
  }
}

module.exports = new AdminController();