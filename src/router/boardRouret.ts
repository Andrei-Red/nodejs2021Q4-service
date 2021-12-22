import { Context } from 'koa';

const Router = require('koa-router');

const routerBoard = new Router();
const Board = require('../models/Board');
const BoardService = require('../service/boarderService');
const logger = require('../loggerManager/winstonLogger');

const boardService = new BoardService();

routerBoard.get('/boards', async (ctx: Context) => {
  try {
    ctx.body = boardService.getBoard();
    logger.info('GET', {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { message: (e as Error).message };

    logger.error('GET', {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  }
});

routerBoard.get('/boards/:id', async (ctx: Context) => {
  try {
    const boardId = ctx.params.id;
    const board = boardService.getBoardById(boardId);
    if (board) {
      ctx.body = board;
    } else {
      ctx.response.status = 404;
      ctx.body = { message: `Board not found by id: ${boardId}` };
    }
    logger.info('GET', {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { message: (e as Error).message };

    logger.error('GET', {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  }
});

routerBoard.post('/boards', async (ctx: Context) => {
  try {
    const boardData = ctx.request.body;
    const board = new Board(boardData);
    boardService.addBoard(board);
    ctx.response.status = 201;
    ctx.response.body = board;
    logger.info('POST', {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { message: (e as Error).message };

    logger.error('POST', {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  }
});

routerBoard.put('/boards/:id', async (ctx: Context) => {
  try {
    const boardData = ctx.request.body;
    const boardsId = ctx.params.id;

    ctx.body = boardService.updateBoard(boardsId, boardData);
    logger.info('PUT', {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { message: (e as Error).message };

    logger.error('PUT', {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  }
});

routerBoard.delete('/boards/:id', async (ctx: Context) => {
  try {
    const boardsId = ctx.params.id;

    const isBoardDeleted = boardService.deleteBoard(boardsId);
    if (isBoardDeleted) {
      ctx.response.status = 204;
    } else {
      ctx.response.status = 400;
      ctx.body = { message: 'something went wrong' };
    }
    logger.info('DELETE', {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  } catch (e) {
    ctx.response.status = 500;
    ctx.body = { message: (e as Error).message };

    logger.error('DELETE', {
      url: ctx.url,
      queryParameters: ctx.params,
      body: ctx.body,
      statusCode: ctx.response.status,
    });
  }
});

module.exports = routerBoard;
