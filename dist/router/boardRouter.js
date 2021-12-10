"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerBoard = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const boarderService_1 = require("../service/boarderService");
const Board_1 = require("../models/Board");
exports.routerBoard = new koa_router_1.default();
const boardService = new boarderService_1.BoarderService();
exports.routerBoard.get('/boards', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        ctx.body = boardService.getBoard();
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerBoard.get('/boards/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardId = ctx.params.id;
        const board = boardService.getBoardById(boardId);
        if (board) {
            ctx.body = board;
        }
        else {
            ctx.response.status = 404;
            ctx.body = { message: `Board not found by id: ${boardId}` };
        }
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerBoard.post('/boards', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardData = ctx.request.body;
        const board = new Board_1.Board(boardData);
        boardService.addBoard(board);
        ctx.response.status = 201;
        ctx.response.body = board;
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerBoard.put('/boards/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardData = ctx.request.body;
        const boardsId = ctx.params.id;
        ctx.body = boardService.updateBoard(boardsId, boardData);
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerBoard.delete('/boards/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const boardsId = ctx.params.id;
        const isBoardDeleted = boardService.deleteBoard(boardsId);
        if (isBoardDeleted) {
            ctx.response.status = 204;
        }
        else {
            ctx.response.status = 400;
            ctx.body = { message: 'something went wrong' };
        }
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
