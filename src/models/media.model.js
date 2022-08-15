const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Media = sequelize.define('blog_media', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '媒体名称, 必填'
  },
  type: {
    type: DataTypes.CHAR(32),
    allowNull: false,
    comment: '媒体类型, 必填'
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '文件路径, 必填'
  },
  size: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    comment: '媒体文件大小, 必填'
  }
});


// 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// Media.sync();

// 将创建表,如果表已经存在,则将其首先删除
// Media.sync({ force: true });

// 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
// Media.sync({ alter: true });

module.exports = Media;