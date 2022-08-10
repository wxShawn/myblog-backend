const Koa = require('koa');
const koaBody = require('koa-body');
const router = require('./routes');
const cors = require('koa2-cors');

const app = new Koa();

app.use(cors({
  origin: ctx => { return 'http://127.0.0.1:5173' },
}));

app.use(koaBody());

app.use(router.routes());

app.listen(3001, () => {
  console.log('http://localhost:3001');
});