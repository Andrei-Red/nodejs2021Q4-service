import { config } from './common/config';

const Koa = require('koa');
const koaBody = require('koa-body');
const routerUser = require('./router/userRouter');
const routerBoard = require('./router/boardRouret');
const routerTask = require('./router/taskRouter');

const {
  handlerError,
  handlerErrorAfterRouters,
  handlerCodeError,
} = require('./loggerManager/otherError');

try {
  process.on('unhandledRejection', (reason, promise) => {
    handlerCodeError('Error in inside code', { reason });
  });

  process.on('uncaughtException', (reason, promise) => {
    handlerCodeError('Error in inside code', { reason });
  });

  const server = new Koa();

  server.use(handlerError);
  server.use(koaBody());

  server.use(routerUser.routes());
  server.use(routerUser.allowedMethods());
  server.use(routerBoard.routes());
  server.use(routerBoard.allowedMethods());
  server.use(routerTask.routes());
  server.use(routerTask.allowedMethods());

  server.use(handlerErrorAfterRouters);

  server.listen(config.PORT, () =>
    console.log(`App is running on http://localhost:${config.PORT}`)
  );
} catch (e) {
  handlerCodeError('Error in inside code', { e });
}
