const fs = require('fs');
const mediaService = require('../services/media.service');

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
      let type = null;
      switch (file.mimetype.split('/', 1)[0]) {
        case 'image':
          type = 1;
          break;
        case 'audio':
          type = 2;
          break;
        case 'video':
          type = 3;
          break;
        default:
          break;
      }
      fileList.push({
        name: file.originalFilename,
        type: type,
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
}

module.exports = new MediaController();