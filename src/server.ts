import { config } from "./common/config";

const Koa = require('koa');
const koaBody = require('koa-body')
const routerUser = require('./router/userRouter');
const routerBoard = require('./router/boardRouret');
const routerTask = require('./router/taskRouter');

const server = new Koa()

server.use(koaBody())

server.use(routerUser.routes())
server.use(routerUser.allowedMethods())
server.use(routerBoard.routes())
server.use(routerBoard.allowedMethods())
server.use(routerTask.routes())
server.use(routerTask.allowedMethods())

server.listen(config.PORT, () =>
  console.log(`App is running on http://localhost:${config.PORT}`)
);