const fs = require('fs');
const path = require('path');
const mediaService = require('../services/media.service');
const paramsValidator = require('../utils/paramsValidator');
const res = require('../utils/res');

class MediaController {
  // 上传文件
  async uploadMedia(ctx) {
    // 保存至数据库的文件列表
    const fileList = [];
    const { files } = ctx.request;
    if (!files) {
      return res.error(ctx, {
        status: 400,
        msg: '未接收到文件',
        result: '',
      });
    }
    // 支持的格式
    const allowType = ['image/jpeg', 'image/png', 'image/gif', 'audio/mpeg', 'audio/ogg', 'audio/wav', 'video/webm', 'video/ogg'];
    // 检查文件格式
    for (const key in files) {
      const file = files[key];
      if (Array.isArray(file)) {
        for (const item of file) {
          fs.unlinkSync(item.filepath);
        }
        return res.error(ctx, {
          status: 400,
          msg: '请求格式错误',
          result: '',
        })
      }
      fileList.push({
        name: file.originalFilename,
        type: file.mimetype,
        path: file.filepath.split('\\src')[1],
        size: file.size
      });
      if (!allowType.includes(file.mimetype)) {
        // 格式不支持，删除该文件
        for (const key2 in files) {
          fs.unlinkSync(files[key2].filepath);
        }
        return res.error(ctx, {
          status: 400,
          msg: '文件类型不支持',
          result: { allowType },
        });
      }
    }
    await mediaService.create(fileList);
    return res.success(ctx, {
      status: 200,
      msg: 'ok',
      result: fileList,
    });
  }

  // 删除文件
  async destroyMedia(ctx) {
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
    const result = await mediaService.destroy(id);
    if (result != 1) {
      return res.error(ctx, {
        status: 400,
        msg: '文件不存在，删除失败',
        result: '',
      });
    }
    return res.success(ctx, {
      status: 200,
      msg: '删除成功',
      result: '',
    });
  }

  // 更新文件
  async updateMedia(ctx) {
    let { id } = ctx.params;
    id = Math.floor(id);
    const { name } = ctx.request.body;
    const errorList = paramsValidator.validate(
      { id, fileName: name },
      ['id', 'name']
    );
    if (errorList.length > 0) {
      return res.error(ctx, {
        status: 400,
        msg: '参数不合法',
        result: { errorList },
      });
    }
    const result = await mediaService.update(id, name);
    if (result[0] != 1) {
      return res.error(ctx, {
        status: 400,
        msg: '文件不存在，更新失败',
        result: '',
      });
    }
    return res.success(ctx, {
      status: 200,
      msg: '更新成功',
      result: '',
    });
  }

  // 查询所有
  findAllMedia(type) {
    return async (ctx) => {
      let { page = 1, pageSize = 10, name = '' } = ctx.query;
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
      const result = await mediaService.findAll(type, page, pageSize, name);
      return res.success(ctx, {
        status: 200,
        msg: 'ok',
        result: result,
      });
    }
  }

  /**
   * 同步数据库和uploads中的文件
   * 同步规则：
   * 1、数据库中有数据，但uploads中无对应文件。do：删除数据库数据
   * 2、uploads中有文件，但数据库中无对应数据。do：在数据库中创建数据
   */
  async syncDataBase(ctx) {
    // 获取文件
    const uploadPath = path.join(__dirname, "../uploads/");
    const fileList = fs.readdirSync(uploadPath);
    if (fileList) {
      for (let i = 0, len = fileList.length; i < len; i++) {
        const filePath = path.join(__dirname, `../uploads/${fileList[i]}`);
        const file = fs.statSync(filePath);
        console.log(file);
      }
    }
    return res.success(ctx, {
      status: 200,
      msg: 'ok',
      result: fileList,
    });
  }
}

module.exports = new MediaController();