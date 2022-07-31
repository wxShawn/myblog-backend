const jwt = require('jsonwebtoken');
const res = require('../utils/res');
const { JWT_SECRET } = require('../config');
const adminService = require('../services/admin.service');

class Auth {
  roleList = [1, 2, 3];
  // 实例化的时候传入角色id列表，设置可访问权限
  constructor(roleList) {
    // 如果未传人角色id，则默认允许所有角色访问
    if (roleList) {
      this.roleList = roleList;
    }
  }

  /**
   * 验证 jwt
   */
  get verifyAuth() {
    return async (ctx, next) => {
      const authToken = ctx.request.header.authorization;
      // 检查 jwt 是否存在
      if (!authToken) {
        return res.error(ctx, {
          status: 401,
          msg: '未登录',
          result: ''
        })
      }
      const token = authToken.replace('Bearer ', '');
      // 解析 jwt
      let tokenInfo = {}
      try {
        tokenInfo = jwt.verify(token, JWT_SECRET);
      } catch (error) {
        return res.error(ctx, {
          status: 401,
          msg: '登录令牌失效，请重新登录',
          result: { error }
        });
      }
      const { id, roleId } = tokenInfo;
      // 检查权限
      if (!this.roleList.includes(roleId)) {
        return res.error(ctx, {
          status: 403,
          msg: '当前角色无权访问！',
          result: ''
        })
      }
      // 根据 id 获取所有信息
      const sqlData = await adminService.findOneById(id);
      // 将信息保存到 ctx.state
      ctx.state = sqlData;

      await next();
    }
    
  }
}

module.exports = Auth;