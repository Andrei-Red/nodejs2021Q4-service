import { Context } from 'koa';
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const ALLOWED_ROUTES = ['/login', "/doc", '/'];

export const authentication = async (ctx: Context, next: () => void) => {
  const url = ctx.url;
  if (ALLOWED_ROUTES.includes(url)) {
    return next();
  }

  const tokenString: string | string[] | undefined =
    ctx.header['authorization'];

  if (typeof tokenString === 'string') {
    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      ctx.status = 401;
      ctx.body = { message: 'Wrong auth schema' };
    } else {
      try {
        jwt.verify(token, SECRET_KEY);
        return next();
      } catch (e) {
        ctx.status = 401;
        ctx.body = { message: 'Problem with token' };
      }
    }
  } else {
    ctx.status = 401;
    ctx.body = { message: 'Problem with token' };
  }

};
