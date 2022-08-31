const { Op } = require('sequelize');
const Project = require('../models/project.model');

class ProjectService {
  async create(name, content, url, cover) {
    const isPublish = false;
    const res = await Project.create({ name, content, url, cover, isPublish });
    return res;
  }

  async destroy(id) {
    const res = await Project.destroy({ where: { id } });
    return res;
  }

  async update(id, name, content, url, cover) {
    const res = await Project.update(
      { name, content, url, cover },
      { where: { id } },
    );
    return res;
  }

  async publish(id, isPublish) {
    const res = await Project.update(
      { isPublish },
      { where: { id } },
    );
    return res;
  }

  async findOneById(id) {
    const res = await Project.findOne({ where: { id } });
    return res;
  }

  async findAll(page, pageSize, name, includeUnpublished) {
    const filter = { name: { [Op.substring]: name } };
    if (!includeUnpublished) {
      filter.isPublish = true;
    }
    const res = await Project.findAndCountAll({
      where: filter,
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    return res;
  }
}

module.exports = new ProjectService();