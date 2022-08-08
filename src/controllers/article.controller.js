const articleService = require("../services/article.service");
const res = require("../utils/res");

class ArticleController {
  // 创建文章
  async createArticle(ctx, next) {
    const { title, content, categoryId } = ctx.request.body;
    const condition = title && (typeof title === 'string') &&
      content && (typeof content === 'string') &&
      categoryId && (typeof categoryId === 'number');
    if (!condition) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: '',
      });
    }
    const result = await articleService.create(title, content, categoryId);
    return res.success(ctx, {
      status: 200,
      msg: '创建成功',
      result: '',
    });
  }
}

module.exports = new ArticleController();