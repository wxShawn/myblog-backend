const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./routes');

const app = new Koa();

app.use(koaBody());

app.use(router.routes());

app.listen(3001, () => {
  console.log('http://localhost:3001');
});