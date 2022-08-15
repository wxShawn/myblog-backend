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

  async findOneById(id) {
    const res = await Media.findOne({ where: { id } });
    return res;
  }

  async findOneByFilePath(path) {
    const res = await Media.findOne({ where: { path } });
    return res;
  }

  async findAll(type, page, pageSize, name = '') {
    const filter = { name: { [Op.substring]: name } };
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
    // typeList长度大于0，加入筛选田间
    typeList.length > 0 && Object.assign(filter, { type: { [Op.or]: [typeList] } });
    const res = await Media.findAndCountAll({
      where: filter,
      offset: pageSize * (page - 1),
      limit: pageSize,
    });
    return res;
  }
}

module.exports = new MediaService();