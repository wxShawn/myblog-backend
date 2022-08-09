const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Article = require('./article.model');

const Category = sequelize.define('blog_category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '分类名称, 必填, 唯一'
  }
});

Category.hasMany(Article, { foreignKey: 'categoryId' });
Article.belongsTo(Category, { foreignKey: 'categoryId' });

// 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// Category.sync();

// 将创建表,如果表已经存在,则将其首先删除
// Category.sync({ force: true });

// 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
// Category.sync({ alter: true });

module.exports = Category;