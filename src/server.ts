
const json = require('koa-json');
const Koa = require('koa');
const koaBody = require('koa-body')
const { PORT } = require('./common/config');

const userRouter = require('./router/userRouter')
const boardRouter = require('./router/boardRouter')
const taskRouter = require('./router/taskRouter')

const server = new Koa()

server.use(koaBody())
server.use(json());

server.use(userRouter.routerUser.routes())
server.use(userRouter.routerUser.allowedMethods())
server.use(boardRouter.routerBoard.routes())
server.use(boardRouter.routerBoard.allowedMethods())
server.use(taskRouter.routerTask.routes())
server.use(taskRouter.routerTask.allowedMethods())

server.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);