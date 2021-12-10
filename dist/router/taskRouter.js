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
exports.routerTask = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const taskService_1 = require("../service/taskService");
const Task_1 = require("../models/Task");
exports.routerTask = new koa_router_1.default();
const taskService = new taskService_1.TaskService();
exports.routerTask.get('/boards/:boardId/tasks', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = ctx.params;
        ctx.body = taskService.getTasks(boardId);
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerTask.get('/boards/:boardId/tasks/:taskId', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = ctx.params;
        const { taskId } = ctx.params;
        const task = taskService.getTaskById(boardId, taskId);
        if (task) {
            ctx.body = task;
        }
        else {
            ctx.response.status = 404;
            ctx.body = { message: `Task not found by id: ${taskId}` };
        }
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerTask.post('/boards/:boardId/tasks', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasksData = ctx.request.body;
        tasksData.boardId = ctx.params.boardId;
        const task = new Task_1.Task(tasksData);
        taskService.addTask(task);
        ctx.response.status = 201;
        ctx.body = task;
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerTask.put('/boards/:boardId/tasks/:taskId', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = ctx.params;
        const { taskId } = ctx.params;
        const taskData = ctx.request.body;
        taskData.boardId = boardId;
        ctx.body = taskService.updateTask(boardId, taskId, taskData);
    }
    catch (e) {
        ctx.response.status = 500;
        console.error(e);
        ctx.body = { message: e.message };
    }
}));
exports.routerTask.delete('/boards/:boardId/tasks/:taskId', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { boardId } = ctx.params;
        const { taskId } = ctx.params;
        const isTaskDeleted = taskService.deleteTask(boardId, taskId);
        if (isTaskDeleted) {
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
