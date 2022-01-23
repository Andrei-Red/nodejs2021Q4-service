import Router from 'koa-router'
import { Context } from 'koa';
import { AuthService } from '../service/authService';

const logger = require('../middleware/loggerManager/winstonLogger');

const routerAuth = new Router();

routerAuth.post('/login', async (ctx: Context) => {
  try {
    const { login, password } = ctx.request.body;

    const user = await AuthService.getUserByLogin(login);




    if(user) {
      const token = await AuthService.signToken(login, password)
      console.log('token', token);

      if(token) {
        ctx.response.status = 200;
        ctx.body = token
      } else {
        ctx.response.status = 403;
        ctx.body = { message: "Wrong password or login"}
      }
    } else {
      ctx.response.status = 403;
      ctx.body = { message: "Wrong password or login"}
    }

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
})

module.exports = routerAuth;