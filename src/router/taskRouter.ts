import { Context } from 'koa';

const Router = require('koa-router');

const routerTask = new Router();
const TaskService = require('../service/taskService');
const Task = require('../models/Task');
const logger = require('../middleware/loggerManager/winstonLogger');

const taskService = new TaskService();

routerTask.get('/boards/:boardId/tasks', async (ctx: Context) => {
  try {
    const { boardId } = ctx["params"];
    ctx.body = await taskService.getTasks(boardId);
    logger.info('GET', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
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
});

routerTask.get('/boards/:boardId/tasks/:taskId', async (ctx: Context) => {
  try {
    const { taskId } = ctx["params"];

    const task =await taskService.getTaskById(taskId);
    if (task) {
      ctx.body = task;
    } else {
      ctx.response.status = 404;
      ctx.body = { message: `Task not found by id: ${taskId}` };
    }
    logger.info('GET', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
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
});

routerTask.post('/boards/:boardId/tasks', async (ctx: Context) => {
  try {
    const tasksData = ctx.request.body;
    tasksData.boardId = ctx["params"].boardId;
    const task = new Task(tasksData);

    await taskService.addTask(task);
    ctx.response.status = 201;
    ctx.body = task;
    logger.info('POST', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
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
});

routerTask.put('/boards/:boardId/tasks/:taskId', async (ctx: Context) => {
  try {
    const { taskId } = ctx["params"];
    const taskData = ctx.request.body;

    ctx.body = await taskService.updateTask(taskId, taskData);
    logger.info('PUT', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
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
});

routerTask.delete('/boards/:boardId/tasks/:taskId', async (ctx: Context) => {
  try {
    const { taskId } = ctx["params"];

    const isTaskDeleted = await taskService.deleteTask(taskId);

    if (isTaskDeleted) {
      ctx.response.status = 204;
    } else {
      ctx.response.status = 404;
      ctx.body = { message: 'something went wrong' };
    }
    logger.info('DELETE', {
      url: ctx.url,
      queryParameters: ctx["params"],
      body: ctx.body,
      statusCode: ctx.response.status,
    });
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
});

module.exports = routerTask;
