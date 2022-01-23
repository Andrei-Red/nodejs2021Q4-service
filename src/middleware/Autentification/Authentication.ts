// import Router from 'koa-router'
import { Context } from 'koa';
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
// const routerAuth = new Router();

// routerAuth.get('/', () => {
//
// })

const ALLOWED_ROUTES = ['/login', "/doc", '/'];

export const authentication = async (ctx: Context, next: () => void) => {
  const url = ctx.url;
  if (ALLOWED_ROUTES.includes(url)) {
    return next();
  }

  const tokenString: string | string[] | undefined =
    ctx.header['authorization'];

  console.log(' authentication', tokenString);

  if (typeof tokenString === 'string') {
    const [type, token] = tokenString.split(' ');
    console.log('type, token', type, token);
    if (type !== 'Bearer') {
      ctx.status = 401;
      ctx.body = { message: 'Wrong auth schema' };
    } else {
      try {
        const res = jwt.verify(token, SECRET_KEY);
        console.log('res', res);
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
