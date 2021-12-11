import { Context } from 'koa';

const Router = require('koa-router');

const routerTask = new Router();
const TaskService = require('../service/taskService');
const Task = require('../models/Task');

const taskService = new TaskService();

routerTask.get('/boards/:boardId/tasks', async (ctx: Context) => {
  try {
    const { boardId } = ctx['params'];
    ctx.body = taskService.getTasks(boardId);
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: (e as Error).message };
  }
});

routerTask.get('/boards/:boardId/tasks/:taskId', async (ctx: Context) => {
  try {
    const { taskId } = ctx['params'];

    const task = taskService.getTaskById(taskId);
    if (task) {
      ctx.body = task;
    } else {
      ctx.response.status = 404;
      ctx.body = { message: `Task not found by id: ${taskId}` };
    }
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: (e as Error).message };
  }
});

routerTask.post('/boards/:boardId/tasks', async (ctx: Context) => {
  try {
    const tasksData = ctx.request.body;
    tasksData.boardId = ctx['params'].boardId;
    const task = new Task(tasksData);

    taskService.addTask(task);
    ctx.response.status = 201;
    ctx.body = task;
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: (e as Error).message };
  }
});

routerTask.put('/boards/:boardId/tasks/:taskId', async (ctx: Context) => {
  try {
    const { taskId } = ctx['params'];
    const taskData = ctx.request.body;

    ctx.body = taskService.updateTask(taskId, taskData);
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: (e as Error).message };
  }
});

routerTask.delete('/boards/:boardId/tasks/:taskId', async (ctx: Context) => {
  try {
    const { taskId } = ctx['params'];

    const isTaskDeleted = taskService.deleteTask(taskId);

    if (isTaskDeleted) {
      ctx.response.status = 204;
    } else {
      ctx.response.status = 400;
      ctx.body = { message: 'something went wrong' };
    }
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: (e as Error).message };
  }
});

module.exports = routerTask;
