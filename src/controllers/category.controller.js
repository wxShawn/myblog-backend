const categoryService = require("../services/category.service");
const { nameRegExp, idRegExp } = require("../utils/regexp");
const res = require('../utils/res');

class CategoryController {
  // 新建分类
  async createCategory(ctx, next) {
    const { name } = ctx.request.body;
    if (!name || !nameRegExp.test(name)) {
      return res.error(ctx, {
        status: 400,
        msg: '无效参数: name',
        result: '',
      });
    }
    const newCategory = await categoryService.create(name);
    console.log(newCategory);
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
  async deleteCategory(ctx, next) {
    let { id } = ctx.params;
    if (!id || !idRegExp.test(id)) {
      return res.error(ctx, {
        status: 400,
        msg: '无效参数: id',
        result: '',
      });
    }
    id = Math.floor(id);
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
  async updateCategory(ctx, next) {
    let { id } = ctx.params;
    if (!id || !idRegExp.test(id)) {
      return res.error(ctx, {
        status: 400,
        msg: '无效参数: id',
        result: '',
      });
    }
    id = Math.floor(id);
    const { name } = ctx.request.body;
    if (!name || !nameRegExp.test(name)) {
      return res.error(ctx, {
        status: 400,
        msg: '无效参数: name',
        result: '',
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
  async getCategory(ctx, next) {
    let { id } = ctx.params;
    if (!id || !idRegExp.test(id)) {
      return res.error(ctx, {
        status: 400,
        msg: '无效参数: id',
        result: '',
      });
    }
    id = Math.floor(id);
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

  // 获取满足条件的所有分类，支持名称的模糊查询
  async getCategoryList(ctx, next) {
    let { page = 1, pageSize = 20, name } = ctx.query;
    const filter = { page: Math.floor(page), pageSize: Math.floor(pageSize), name };
    !name && (filter.name = '');
    const list = await categoryService.getAll(filter);
    return res.success(ctx, {
      status: 200,
      msg: 'ok',
      result: list,
    });
  }
}

module.exports = new CategoryController();