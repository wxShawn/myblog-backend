const EmailVerify = require('../models/emailVerify.model');

class EmailVerifyService {
  /**
   * 存入验证码
   * data {
   *  email,
   *  verify_code,
   * }
   */
  async save(data) {
    const res = await EmailVerify.create(data);
    // 返回创建成功的数据
    return res.dataValues;
  }

  /**
   * 查询验证码
   */
  async findOneByEmail(email) {
    const res = await EmailVerify.findOne({
      attributes: ['email', 'verifyCode'],
      where: { email },
    });
    
    console.log('haha');
    // 查询成功时返回查询到的数据对象，未查询到时返回 null
    return res ? res.dataValues : null;
  }

  /**
   * 删除验证码
   */
  async remove(email) {
    const res = await EmailVerify.destroy({ where: { email } });
    // 返回删除成功的数量
    return res;
  }
}

module.exports = new EmailVerifyService();