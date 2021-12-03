const Router = require('koa-router');
const routerUser = new Router();

routerUser.get('/users', async (ctx) => {
  ctx.body = 'user router work';
});


module.exports = routerUser