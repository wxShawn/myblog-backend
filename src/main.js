const path = require('path');
const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./routes');
const cors = require('koa2-cors');
const static = require("koa-static");

const app = new Koa();
// 支持跨域请求
app.use(cors({
  origin: ctx => { return 'http://127.0.0.1:5173' },
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