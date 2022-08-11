const { Op } = require('sequelize');
const Article = require('../models/article.model');
const Category = require('../models/category.model');

class CategoryService {
  async create(name) {
    const [ newCategory, created ] = await Category.findOrCreate({ where: { name } });
    return created ? newCategory : null;
  }

  async destroy(id) {
    const res = await Category.destroy({ where: { id } });
    // 返回删除成功的数量
    return res;
  }

  async update(id, name) {
    const res = await Category.update({ name }, { where: { id } });
    // 返回修改成功的数量
    return res;
  }

  async getOneById(id) {
    const res = await Category.findOne({ where: { id } });
    // 返回查询结果
    return res;
  }

  async getAll(filter) {
    const { page, pageSize, name } = filter;
    const res = await Category.findAndCountAll({
      where: {
        name: { [Op.substring]: name, }
      },
      include: { model: Article, attributes: ['id', 'title'] },
      distinct: true, // 使res中的count属性不计算include的数量
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    return res;
  }
}

module.exports = new CategoryService();