const { PORT } = require('./common/config');

const json = require('koa-json');
const Koa = require('koa');
const koaBody = require('koa-body')

const routerUser = require('./router/user')
const routerBoard = require('./router/board')
const routerTask = require('./router/task')

const server = new Koa()

server.use(koaBody())
// server.use(json());

server.use(routerUser.routes())
server.use(routerUser.allowedMethods())
server.use(routerBoard.routes())
server.use(routerBoard.allowedMethods())
server.use(routerTask.routes())
server.use(routerTask.allowedMethods())

// server.use(async (ctx, next) => {
//   ctx.body = 'Hello world'
// })

server.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);