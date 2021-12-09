const RouterBoard = require('koa-router');

const routerBoard = new RouterBoard();
const Board = require('../models/Board')
const BoardService = require('../service/boarderService')

const boardService = new BoardService()

routerBoard.get('/boards', async (ctx) => {
  try {
    ctx.body = boardService.getBoard()
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: e.message };
  }
});

routerBoard.get('/boards/:id', async (ctx) => {
  try {
    const boardId = ctx.params.id
    const board = boardService.getBoardById(boardId)
    if(board) {
      ctx.body = board
    } else {
      ctx.response.status = 404
      ctx.body = { message: `Board not found by id: ${boardId}` };
    }
  }catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: e.message };
  }
})

routerBoard.post('/boards', async (ctx) => {
  try {
    const boardData = ctx.request.body
    const board = new Board(boardData)
    boardService.addBoard(board)
    ctx.response.status = 201;
    ctx.response.body = board
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: e.message };
  }
});

routerBoard.put('/boards/:id', async (ctx) => {
  try {
    const boardData = ctx.request.body;
    const boardsId = ctx.params.id;

    ctx.body = boardService.updateBoard(boardsId, boardData)
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: e.message };
  }
});


routerBoard.delete('/boards/:id', async (ctx) => {
  try {
    const boardsId = ctx.params.id;

    const isBoardDeleted = boardService.deleteBoard(boardsId)
    if(isBoardDeleted) {
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
})

module.exports = { routerBoard }