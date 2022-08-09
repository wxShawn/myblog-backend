const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const adminService = require("../services/admin.service");
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
}

module.exports = new AdminController();