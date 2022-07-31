const res = require('../utils/res');
const emailVerifyService = require("../services/emailVerify.service");

module.exports = {
  // 检查邮箱和验证码
  async verifyEmailCode(ctx, next) {
    const { email, verifyCode } = ctx.request.body;
    // 查询数据库中的验证码
    const sqlData = await emailVerifyService.findOneByEmail(email);
    // 返回的值为空时，说明数据库中没有对应邮箱的验证码，验证码已过期
    if (!sqlData) {
      return res.error(ctx, {
        status: 400,
        msg: '验证码已过期',
        result: ''
      });
    }
    
    const sqlVerifyCode = sqlData.verifyCode;
    // 检查用户提交的"邮箱+验证码"和 cookie 中已加密的"邮箱+验证码"是否匹配
    if (!(verifyCode === sqlVerifyCode)) {
      return res.error(ctx, {
        status: 400,
        msg: '验证码错误',
        result: ''
      });
    }
    
    // 验证完成，删除验证码
    await emailVerifyService.remove(email);
    
    await next();
  }
}