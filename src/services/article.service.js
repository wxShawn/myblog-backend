const { Op } = require('sequelize');
const Article = require("../models/article.model");
const Category = require("../models/category.model");

class ArticleService {
  // 创建
  async create(title, content, categoryId) {
    const isPublish = false;
    const res = await Article.create({ title, content, isPublish, categoryId });
    return res;
  }

  // 删除
  async destory(id) {
    const res = await Article.destroy({ where: { id } });
    // 返回删除成功的数量
    return res;
  }

  // 更新
  async update(id, title, content, categoryId) {
    const res = await Article.update(
      { title, content, categoryId },
      { where: { id } }
    );
    return res;
  }

  // 更新发布状态
  async publish(id, isPublish) {
    const res = await Article.update({ isPublish }, { where: { id } });
    return res;
  }

  // 查询单个文章
  async findOneById(id) {
    const res = await Article.findOne({
      attributes: { exclude: ['categoryId'] },
      where: { id },
      include: { model: Category, attributes: ['id', 'name'] },
    });
    return res;
  }

  // 查询满足条件的所有文章(title模糊查询)
  async findAll(filter) {
    const { page, pageSize, title, categoryId, includeUnpublished } = filter
    const otherFilter = { title: { [Op.substring]: title } };
    if (!includeUnpublished) {
      otherFilter.isPublish = true;
    }
    if (categoryId) otherFilter.categoryId = categoryId;
    const res = await Article.findAndCountAll({
      attributes: { exclude: ['categoryId'] },
      where: otherFilter,
      include: { model: Category, attributes: ['id', 'name'] },
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    return res;
  }
}

module.exports = new ArticleService();