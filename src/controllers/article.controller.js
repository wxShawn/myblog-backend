const articleService = require("../services/article.service");
const paramsValidator = require("../utils/paramsValidator");
const res = require("../utils/res");

class ArticleController {
  // 创建文章
  async createArticle(ctx, next) {
    const { title, content, categoryId } = ctx.request.body;
    // 检查参数
    const errorList = paramsValidator.validate(
      { title, content, id: categoryId },
      ['title', 'content', 'categoryId']
    );
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await articleService.create(title, content, categoryId);
    return res.success(ctx, {
      status: 200,
      msg: '创建成功',
      result: result,
    });
  }

  // 删除文章
  async deleteArticle(ctx, next) {
    const { id } = ctx.params;
    const result = await articleService.destory(id);
    if (result != 1) {
      return res.error(ctx, {
        status: 400,
        msg: '文章不存在，删除失败',
        result: '',
      });
    }
    res.success(ctx, {
      status: 200,
      msg: '删除成功',
      result: result,
    });
  }

  // 更新文章
  async updateArticle(ctx, next) {
    const { id } = ctx.params;
    const { title, content, categoryId } = ctx.request.body;
    // 检查参数
    const errorList = paramsValidator.validate(
      { title, content, id: categoryId },
      ['title', 'content', 'categoryId'],
    );
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await articleService.update(id, title, content, categoryId);
    return res.success(ctx, {
      status: 200,
      msg: '更新成功',
      result: result,
    });
  }

  // 更新发布状态
  async updatePublishState(ctx, next) {
    const { id } = ctx.params;
    let { isPublish } = ctx.request.body;
    // 检查参数
    const errorList = paramsValidator.validate({ isPublish });
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await articleService.publish(id, isPublish);
    return res.success(ctx, {
      status: 200,
      msg: '更新成功',
      result: result,
    });
  }

  // 获取单个文章
  async findOneArticle(ctx, next) {
    const { id } = ctx.params;
    const result = await articleService.findOneById(id);
    return res.success(ctx, {
      status: 200,
      msg: 'ok',
      result: result,
    });
  }

  // 获取所有文章(title模糊查询)
  async findAllArticles(ctx, next) {
    let { page = 1, pageSize = 20, title = '', categoryId = 0 } = ctx.query;
    page = Math.floor(page);
    pageSize = Math.floor(pageSize);
    categoryId = Math.floor(categoryId);
    // 校验参数
    const errorList = paramsValidator.validate(
      { page, pageSize, title, id: categoryId },
      ['page', 'pageSize', 'title', 'categoryId']
    );
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const filter = { page, pageSize, title, categoryId: categoryId === 0 ? null : categoryId };
    const result = await articleService.findAll(filter);
    return res.success(ctx, {
      status: 200,
      msg: 'ok',
      result: result,
    });
  }
}

module.exports = new ArticleController();