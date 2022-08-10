class ParamsValidator {
  /**
   * type: 类型
   * pattern: 正则表达式(仅string)
   * minimum: 最小值(仅number)
   * maximum: 最大值(仅number)
   */
  #schema = {
    /**
     * ********** 管理员、用户相关 **********
     */
    // 管理员名称
    adminName: {
      type: 'string',
    },
    // 邮箱
    email: {
      type: 'string',
      pattern: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/,
    },
    // 密码
    password: {
      type: 'string',
      pattern: /^[\w@.]{8,15}$/,// （8-15个数字、字母、下划线、@ 或 .）
    },
    // 验证码
    verifyCode: {
      type: 'string',
      pattern: /^[0-9]{6}$/,// 6位数字
    },

    /**
     * ********** 文章相关 **********
     */
    title: {
      type: 'string',
    },
    // 文本内容
    content: {
      type: 'string',
    },
    // 是否发布
    isPublish: {
      type: 'boolean',
    },
    // 分类名称
    categoryName: {
      type: 'string',
    },

    /**
     * ********** 通用 **********
     */
    // 文件名称（文章、图片、音乐、视频等）
    fileName: {
      type: 'string',
    },
    // id
    id: {
      type: 'number',
      min: 1,
    },
    // 分页当前页数
    page: {
      type: 'number',
      min: 1,
    },
    // 分页大小
    pageSize: {
      type: 'number',
      min: 1,
    }
  }
  

  /**
   * 验证器, 返回一个包含验证失败的属性名数组
   * @param {object} checkObj 检查的对象
   * @param {string[]} nameList 指定返回的属性别名（可选）
   * @returns {string[]} 验证失败的属性名数组
   */
  validate(checkObj, nameList) {
    const errorList = []; // 验证失败的数组
    const keyList = Object.keys(checkObj);
    for (let i = 0; i < keyList.length; i++) {
      const key = keyList[i]; // 属性名
      const value = checkObj[key]; // 属性值
      const schema = this.#schema[key]; // 属性名对应的schema
      const returnKey = nameList && nameList[i] ? nameList[i] : key; // 返回的属性名
      if (!schema) throw new Error(`${key} 未定义`);
      // 检验
      switch (schema.type) {
        case 'string':
          if (typeof value != 'string') errorList.push(returnKey);
          else if (schema.pattern && !schema.pattern.test(value)) errorList.push(returnKey);
          break;
        case 'number':
          if (typeof value != 'number' || Number.isNaN(value)) errorList.push(returnKey);
          else if (schema.min && !value > schema.min) errorList.push(returnKey);
          else if (schema.max && !value < schema.max) errorList.push(returnKey);
          break;
        case 'boolean':
          if (typeof value != 'boolean') errorList.push(returnKey);
          break;
        default:
          break;
      }
    }
    // 返回数组
    return errorList;
  }
}

module.exports = new ParamsValidator();