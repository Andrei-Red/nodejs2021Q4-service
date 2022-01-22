import { Context } from 'koa';

const Router = require('koa-router');
const UserService = require('../service/userService');
const UserRouter = require('../models/User');
const logger = require('../middleware/loggerManager/winstonLogger');

const routerUser = new Router();
const userService = new UserService();

routerUser.get('/users', async (ctx: Context) => {
  try {
    ctx.body = await userService.getUsers();
    logger.info('GET', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { message: (e as Error).message };

    logger.error('GET', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  }
});

routerUser.get('/users/:id', async (ctx: Context) => {
  try {
    const userId = ctx["params"].id;
    const user = await userService.getUsersById(userId);
    if (user) {
      ctx.body = user;
    } else {
      ctx.response.status = 404;
      ctx.body = { message: `User not found by id: ${userId}` };
    }
    logger.info('GET', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { message: (e as Error).message };

    logger.error('GET', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  }
});

routerUser.post('/users', async (ctx: Context) => {
  try {
    const userData = ctx.request.body;
    const user = new UserRouter(userData);
    const userDataToResponse = UserRouter.toResponse(user);
    await userService.addUser(user);
    ctx.response.status = 201;
    ctx.body = userDataToResponse;
    logger.info('POST', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { message: (e as Error).message };

    logger.error('GET', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  }
});

routerUser.put('/users/:id', async (ctx: Context) => {
  try {
    const userData = ctx.request.body;
    const userId = ctx["params"].id;

    ctx.body = await userService.updateUser(userId, userData);
    logger.info('PUT', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { message: (e as Error).message };

    logger.error('GET', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  }
});

routerUser.delete('/users/:id', async (ctx: Context) => {
  try {
    const userId = ctx["params"].id;

    const isUserDeleted = await userService.deleteUser(userId);
    if (isUserDeleted) {
      ctx.response.status = 204;
    } else {
      ctx.response.status = 400;
      ctx.body = { message: 'something went wrong' };
    }
    logger.info('DELETE', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { message: (e as Error).message };

    logger.error('GET', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  }
});

module.exports = routerUser;
