const { Op } = require('sequelize');
const Media = require("../models/media.model");

class MediaService {
  async create(fileList) {
    const res = await Media.bulkCreate(fileList);
    return res;
  }

  async destroy(id) {
    const res = await Media.destroy({ where: { id } });
    return res;
  }

  async update(id, name) {
    const res = await Media.update({ name }, { where: { name } });
    return res;
  }

  async findOne(id) {
    const res = await Media.findOne({ id });
    return res;
  }

  async findAll(page, pageSize, name = '') {
    const res = await Media.findAndCountAll({
      where: {
        name: { [Op.substring]: name }
      },
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    return res;
  }
}

module.exports = new MediaService();