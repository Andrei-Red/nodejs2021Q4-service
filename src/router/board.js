const Router = require('koa-router');
const routerBoard = new Router();

routerBoard.get('/boards', async (ctx) => {
  ctx.body = 'boards router work';
});


module.exports = routerBoard