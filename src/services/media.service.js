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
    const res = await Media.update({ name }, { where: { id } });
    return res;
  }

  async findOne(id) {
    const res = await Media.findOne({ id });
    return res;
  }

  async findAll(type, page, pageSize, name = '') {
    const typeList = [];
    switch (type) {
      case 'image':
        typeList.push.apply(typeList, ['image/jpeg', 'image/png', 'image/gif']);
        break;
      case 'audio':
        typeList.push.apply(typeList, ['audio/mpeg', 'audio/ogg', 'audio/wav']);
        break;
      case 'video':
        typeList.push.apply(typeList, ['video/webm', 'video/ogg']);
        break;
      default:
        break;
    }
    const res = await Media.findAndCountAll({
      where: {
        type: { [Op.or]: [typeList] },
        name: { [Op.substring]: name }
      },
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    return res;
  }
}

module.exports = new MediaService();