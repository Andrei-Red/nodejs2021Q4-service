import { Context } from 'koa';

const Router = require('koa-router');
const UserService = require('../service/userService');
const UserRouter = require('../models/User');

const routerUser = new Router();
const userService = new UserService();

routerUser.get('/users', async (ctx: Context) => {
  try {
    ctx.body = userService.getUsers();
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: (e as Error).message };
  }
});

routerUser.get('/users/:id', async (ctx: Context) => {
  try {
    const userId = ctx['params'].id;
    const user = userService.getUsersById(userId);
    if (user) {
      ctx.body = user;
    } else {
      ctx.response.status = 404;
      ctx.body = { message: `User not found by id: ${userId}` };
    }
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: (e as Error).message };
  }
});

routerUser.post('/users', async (ctx: Context) => {
  try {
    const userData = ctx.request.body;
    const user = new UserRouter(userData);
    const userDataToResponse = UserRouter.toResponse(user);
    userService.addUser(userDataToResponse);
    ctx.response.status = 201;
    ctx.body = userDataToResponse;
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: (e as Error).message };
  }
});

routerUser.put('/users/:id', async (ctx: Context) => {
  try {
    const userData = ctx.request.body;
    const userId = ctx['params'].id;

    ctx.body = userService.updateUser(userId, userData);
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: (e as Error).message };
  }
});

routerUser.delete('/users/:id', async (ctx: Context) => {
  try {
    const userId = ctx['params'].id;

    const isUserDeleted = userService.deleteUser(userId);
    if (isUserDeleted) {
      ctx.response.status = 204;
    } else {
      ctx.response.status = 400;
      ctx.body = { message: 'something went wrong' };
    }
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: (e as Error).message };
  }
});

module.exports = routerUser;
