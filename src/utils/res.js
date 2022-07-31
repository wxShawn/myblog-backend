module.exports = {
  async success(ctx, { status, msg, result }) {
    ctx.status = status;
    ctx.body = {
      code: 0,
      msg,
      result,
    }
    return true;
  },

  async error(ctx, { status, msg, result }) {
    ctx.status = status;
    ctx.body = {
      code: -1,
      msg,
      result,
    }
    return false;
  }
}