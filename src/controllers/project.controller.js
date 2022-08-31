const res = require("../utils/res");

const projectService = require('../services/project.service');
const paramsValidator = require("../utils/paramsValidator");

class ProjectController {

  async createProject(ctx) {
    const { name, content, url, cover } = ctx.request.body;
    const errorList = paramsValidator.validate(
      { fileName: name, content, url },
      ['name', 'content', 'url', 'cover'],
    );
    // 参数url会被cover覆盖掉，所以这里需要分两次检测
    const errorList2 = paramsValidator.validate({ url: cover }, ['cover']);
    errorList.push.apply(errorList, errorList2);
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await projectService.create(name, content, url, cover);
    return res.success(ctx, {
      status: 200,
      msg: '添加成功',
      result: result,
    });
  }

  async destroyProject(ctx) {
    let { id } = ctx.params;
    id = Math.floor(id);
    const errorList = paramsValidator.validate({ id });
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await projectService.destroy(id);
    if (result != 1) {
      return res.error(ctx, {
        status: 400,
        msg: '项目不存在，删除失败',
        result: '',
      });
    }
    return res.success(ctx, {
      status: 200,
      msg: '删除成功',
      result: '',
    });
  }

  async updateProject(ctx) {
    let { id } = ctx.params;
    id = Math.floor(id);
    const { name, content, url, cover } = ctx.request.body;
    const errorList = paramsValidator.validate(
      { id, fileName: name, content, url },
      ['id', 'name', 'content', 'url'],
    );
    const errorList2 = paramsValidator.validate({ url: cover }, ['cover']);
    errorList.push.apply(errorList, errorList2);
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await projectService.update(id, name, content, url, cover);
    return res.success(ctx, {
      status: 200,
      msg: '更新成功',
      result: result,
    });
  }

  async updatePublish(ctx) {
    let { id } = ctx.params;
    id = Math.floor(id);
    const { isPublish } = ctx.request.body;
    const errorList = paramsValidator.validate({ id, isPublish });
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await projectService.publish(id, isPublish);
    return res.success(ctx, {
      status: 200,
      msg: '更新成功',
      result: result,
    });
  }

  async findOneProject(ctx) {
    let { id } = ctx.params;
    id = Math.floor(id);
    const errorList = paramsValidator.validate({ id });
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await projectService.findOneById(id);
    return res.success(ctx, {
      status: 200,
      msg: 'ok',
      result: result,
    });
  }

  async findAllProject(ctx) {
    let { page = 1, pageSize = 10, name = '', includeUnpublished } = ctx.query;
    page = Math.floor(page);
    pageSize = Math.floor(pageSize);
    const errorList = paramsValidator.validate(
      { page, pageSize, fileName: name },
      ['page', 'pageSize', 'name']
    );
    if (errorList.length > 0) {
      return res.error(ctx, { 
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await projectService.findAll(page, pageSize, name, includeUnpublished);
    return res.success(ctx, {
      status: 200,
      msg: 'ok',
      result: result,
    });
  }
}

module.exports = new ProjectController();