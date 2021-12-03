const Router = require('koa-router');
const UserService = require('../service/userService');
const User = require('../models/User');

const routerUser = new Router();
const userService = new UserService();

routerUser.get('/users', async (ctx) => {
  const allUsers = userService.getUsers();
  ctx.body = allUsers;
});

routerUser.get('/users/:id', async (ctx) => {
  try {
    const userId = ctx.params.id;
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
    ctx.body = { message: e.message };
  }
});

routerUser.post('/users', async (ctx) => {
  try {
    const userData = ctx.request.body;
    const user = new User(userData);
    const userDataToResponse = User.toResponse(user)
    userService.setUser(userDataToResponse);
    ctx.response.status = 201;
    ctx.body = userDataToResponse;
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: e.message };
  }
});

routerUser.put('/users/:id', async (ctx) => {
  try {
    const userData = ctx.request.body;
    const userId = ctx.params.id;

    const updatedUser = userService.updateUser(userId, userData);
    ctx.body = updatedUser;
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: e.message };
  }
});

routerUser.delete('/users/:id', async (ctx) => {
  try {
    const userId = ctx.params.id;

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
    ctx.body = { message: e.message };
  }
});

module.exports = routerUser;
