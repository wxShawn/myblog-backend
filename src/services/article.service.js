const Article = require("../models/article.model");

class ArticleService {
  async create(title, content, categoryId) {
    const res = await Article.create({ title, content, categoryId });
    return res;
  }
}

module.exports = new ArticleService();