import "reflect-metadata";
import { config } from './common/config';
// import  ormconfig   from './common/ormconfig';
import { createConnection } from 'typeorm';

const Koa = require('koa');
const koaBody = require('koa-body');
const routerUser = require('./router/userRouter');
const routerBoard = require('./router/boardRouret');
const routerTask = require('./router/taskRouter');
const routerAuth = require('./router/authRouter');

const {
  handlerError,
  handlerErrorAfterRouters,
  handlerCodeError,
} = require('./middleware/loggerManager/otherError');

try {
  process.on('unhandledRejection', (reason) => {
    handlerCodeError('Error in inside code', { reason });
  });

  process.on('uncaughtException', (reason) => {
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

  server.use(routerAuth.routes())
  server.use(routerAuth.allowedMethods())

  server.use(handlerErrorAfterRouters);


  createConnection()
    .then(() => {
      console.log('createConnection SUCCESS');
      server.listen(config.PORT, () =>
        console.log(`App is running on http://localhost:${config.PORT}`)
      );
    })
    .catch((error: Error) => {
      process.stderr.write(`${error.name}`);
      process.exit(1);
    });


} catch (e) {
  handlerCodeError('Error in inside code', { e });
}
