const sendEmail = require('../utils/sendEmail');
const res = require('../utils/res');
const emailVerifyService = require('../services/emailVerify.service');

class EmailVerifyController {
  /**
   * 发送邮箱验证码
   */
  async sendVerifyCode(ctx, next) {
    const { email } = ctx.state;
    
    // 生成6位随机验证码
    let verifyCode = '';
    for (let i = 0; i < 6; i++) {
      verifyCode = verifyCode + Math.floor(Math.random()*10);
    }

    // 设置验证码过期时间(单位：min)
    const expire = 5;
    
    // 删除旧的验证码（如果存在）
    await emailVerifyService.destroy(email);

    // 将新验证码存入数据库
    await emailVerifyService.save({ email, verifyCode });

    // 到达设定时间后删除验证码
    setTimeout(() => {
      emailVerifyService.destroy(email);
    }, 1000*60*expire);

    // 配置邮件内容
    const option = {
      to: email,
      subject: '【Shawn\'s blog】邮箱验证',
      html: ` <div style="padding: 10px 20px; background: #fcfcff; font-size: 14px;">
                <p>你好！</p>
                <p>
                  <span>感谢你使用 Shawn\'s blog。</span><br/>
                  <span>你当前操作的账号邮箱为：${email}，请回填如下验证码：</span>
                </p>
                <p
                  style="font-size: 26px;
                  font-weight: bold;
                  color: #025bc0;
                  width: 160px;
                  background: #f2f4f7;
                  text-align: center;
                  letter-spacing: 3px;"
                  >
                  ${verifyCode}
                </p>
                <p>验证码在${expire}分钟内有效，请及时使用。</p>
                <p style="color: #f00;">注：如非本人操作请忽略此邮件！</p>
              </div>`
    }

    // 给用户发送邮件
    try {
      await sendEmail(option);
    } catch (error) {// 捕获到错误，返回错误
      logError('获取验证码失败', error);
      return res.error(ctx, {
        status: 500,
        msg: '获取验证码失败',
        result: ''
      });
    }
    
    // 响应客户端
    return res.success(ctx, {
      status: 200,
      msg: '验证码已发送',
      result: ''
    });
    
  }
}

module.exports = new EmailVerifyController();