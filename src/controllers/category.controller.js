const categoryService = require("../services/category.service");
const paramsValidator = require("../utils/paramsValidator");
const res = require('../utils/res');

class CategoryController {
  // 新建分类
  async createCategory(ctx) {
    const { name } = ctx.request.body;
    // 参数校验
    const errorList = paramsValidator.validate({ categoryName: name }, ['name']);
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '无效的参数',
        result: { errorList },
      });
    }
    const newCategory = await categoryService.create(name);
    if (!newCategory) {
      return res.error(ctx, {
        status: 400,
        msg: '分类名称已存在',
        result: '',
      });
    }
    return res.success(ctx, {
      status: 200,
      msg: '分类创建成功',
      result: newCategory,
    });
  }

  // 删除分类
  async deleteCategory(ctx) {
    const { id } = ctx.params;
    const { blog_articles } = await categoryService.getOneById(id);
    if (blog_articles.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '该分类下还有文章，无法删除',
        result: '',
      });
    }
    const result = await categoryService.destroy(id);
    if (result != 1) {
      return res.error(ctx, {
        status: 400,
        msg: '分类不存在，删除失败',
        result: '',
      });
    }
    return res.success(ctx, {
      status: 200,
      msg: '删除成功',
      result: result,
    });
  }

  // 更新分类
  async updateCategory(ctx) {
    const { id } = ctx.params;
    const { name } = ctx.request.body;
    const errorList = paramsValidator.validate({ categoryName: name }, ['name']);
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await categoryService.update(id, name);
    if (result[0] != 1) {
      return res.error(ctx, {
        status: 400,
        msg: '分类不存在，更新失败',
        result: '',
      });
    }
    return res.success(ctx, {
      status: 200,
      msg: '更新成功',
      result: result,
    });
  }

  // 根据ID获取单个分类
  async getCategory(ctx) {
    let { id } = ctx.params;
    const result = await categoryService.getOneById(id);
    if (!result) {
      return res.error(ctx, {
        status: 404,
        msg: '分类不存在',
        result: '',
      });
    }
    return res.success(ctx, {
      status: 200,
      msg: 'ok',
      result: result,
    });
  }

  // 获取满足条件的所有分类，名称模糊查询
  async getCategoryList(ctx) {
    let { page = 1, pageSize = 20, name = '' } = ctx.query;
    page = Math.floor(page);
    pageSize = Math.floor(pageSize);
    const errorList = paramsValidator.validate(
      { page, pageSize, categoryName: name },
      ['page', 'pageSize', 'name']
    );
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const filter = { page, pageSize, name };
    const list = await categoryService.getAll(filter);
    return res.success(ctx, {
      status: 200,
      msg: 'ok',
      result: list,
    });
  }
}

module.exports = new CategoryController();