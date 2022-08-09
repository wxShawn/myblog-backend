const paramsValidator = require("../utils/paramsValidator");
const res = require("../utils/res");

module.exports = {
  // 校验id
  async checkCategoryId(ctx, next) {
    let { id } = ctx.params;
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