const Admin = require("../models/admin.model");

class AdminService {
  async create({ name, email, password, roleId }) {
    const res = await Admin.create({ name, email, password, roleId });
    return res;
  }

  async update(id, name, email) {
    const res = await Admin.update(
      { name, email },
      { where: { id } }
    );
    return res;
  }

  async findOneByEmail(email) {
    const res = await Admin.findOne({
      where: { email },
    });
    return res ? res.dataValues : null;
  }

  async findOneById(id) {
    const res = await Admin.findOne({
      where: { id }
    });
    return res ? res.dataValues : null;
  }
}

module.exports = new AdminService();