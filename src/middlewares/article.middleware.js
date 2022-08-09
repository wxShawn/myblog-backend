const res = require('../utils/res');
const paramsValidator = require('../utils/paramsValidator');

module.exports = {
  // 检查文章id是否合法
  async checkArticleId(ctx, next) {
    let { id } = ctx.params;
    // string转number
    id = Math.floor(id);
    const errorList = paramsValidator.validate({ id });
    if (errorList.length > 0) {
        return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    ctx.params.id = id;
    await next();
  }
}