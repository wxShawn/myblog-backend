const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./routes');
const cors = require('koa2-cors');
const static = require("koa-static");

const app = new Koa();
// 支持跨域请求
app.use(cors({
  origin: ctx => {
    // 可跨域白名单
    const whiteList = [
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'https://wxshawn.github.io/',
    ];
    // 静态资源所有ip地址或域名都可跨域
    const pathReg = /\/[\w]{25}\.[a-z]+/;
    if (pathReg.test(ctx.request.url)) {
      return '*';
    }
    // 允许白名单跨域
    if (ctx.header.referer) {
      let url = ctx.header.referer.substring(0, ctx.header.referer.length - 1);
      if(whiteList.includes(url)){
        return url;
      }
    }
    return 'http://127.0.0.1:3001';
  },
}));
// 解析请求体
app.use(koaBody(path));
// 开放静态资源
app.use(static(path.join(__dirname, 'uploads/')));
// 路由
app.use(router.routes());

app.listen(3001, () => {
  console.log('http://localhost:3001');
});