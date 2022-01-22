import Router from 'koa-router'
import { Context } from 'koa';
import { AuthService } from '../service/authService';

const logger = require('../middleware/loggerManager/winstonLogger');

const routerAuth = new Router();

routerAuth.post('/login', async (ctx: Context) => {
  try {
    const { login, password } = ctx.request.body;
    console.log('userData', login, password);
    ctx.body = await AuthService.auth(login);
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