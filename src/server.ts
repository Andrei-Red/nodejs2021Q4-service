// import json from 'koa-json';
import Koa from 'koa';
import koaBody from 'koa-body';

import { config } from './common/config';
import { routerUser } from './router/userRouter';
import { routerBoard } from './router/boardRouter';
import { routerTask } from './router/taskRouter';

const server = new Koa();

server.use(koaBody());
// server.use(json());

server.use(routerUser.routes());
server.use(routerUser.allowedMethods());
server.use(routerBoard.routes());
server.use(routerBoard.allowedMethods());
server.use(routerTask.routes());
server.use(routerTask.allowedMethods());

server.listen(config.PORT, () =>
  console.log(`App is running on http://localhost:${config.PORT}`)
);
