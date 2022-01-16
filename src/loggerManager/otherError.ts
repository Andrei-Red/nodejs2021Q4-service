import { Context } from 'koa';
const logger = require('./winstonLogger');

const handlerError = async (ctx: Context, next: () => void) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };

    logger.error(err.message, {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.status,
    });
  }
};

const handlerErrorAfterRouters = async (ctx: Context, next: () => void) => {
  try {
    if (ctx.status >= 400) {
      logger.info('info', {
        url: ctx.url,
        queryParameters: ctx.params,
        body: ctx.body,
        statusCode: ctx.status,
      });
    }
    await next();
  } catch (err: any) {
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };

    logger.error(err.message, {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.status,
    });
  }
};

const handlerCodeError = (e: Error) => {
   logger.error(`code error: ${e}`);
}

module.exports = { handlerError, handlerErrorAfterRouters, handlerCodeError };
