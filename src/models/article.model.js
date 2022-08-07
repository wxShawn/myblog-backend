const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const Article = sequelize.define('blog_article', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '文章标题, 必填'
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '文章内容, 必填'
  },
  isPublish: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否发布, 必填'
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '分类id, 必填'
  }
});

// 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
// Article.sync();

// 将创建表,如果表已经存在,则将其首先删除
// Article.sync({ force: true });

// 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
// Article.sync({ alter: true });

module.exports = Article;