const Router = require('koa-router');
const routerTask = new Router();
const TaskService = require('../service/taskService');
const Task = require('../models/Task');

const taskService = new TaskService();

routerTask.get('/boards/:boardId/tasks', async (ctx) => {
  try {
    const boardId = ctx.params.boardId;
    ctx.body = taskService.getTasks(boardId);
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: e.message };
  }
});

routerTask.get('/boards/:boardId/tasks/:taskId', async (ctx) => {
  try {
    const boardId = ctx.params.boardId;
    const taskId = ctx.params.taskId;

    const task = taskService.getTaskById(boardId, taskId);
    if (task) {
      ctx.body = task;
    } else {
      ctx.response.status = 404;
      ctx.body = { message: `Task not found by id: ${taskId}` };
    }
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: e.message };
  }
});

routerTask.post('/boards/:boardId/tasks', async (ctx) => {
  try {
    const tasksData = ctx.request.body;
    tasksData.boardId = ctx.params.boardId
    const task = new Task(tasksData);

    taskService.addTask(task);
    ctx.response.status = 201;
    ctx.body = task;
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: e.message };
  }
});

routerTask.put('/boards/:boardId/tasks/:taskId', async (ctx) => {
  try {
    const boardId = ctx.params.boardId;
    const taskId = ctx.params.taskId;
    const taskData = ctx.request.body;
    taskData.boardId = boardId

    ctx.body = taskService.updateTask(boardId, taskId, taskData);
  } catch (e) {
    ctx.response.status = 500;
    console.error(e);
    ctx.body = { message: e.message };
  }
});

routerTask.delete('/boards/:boardId/tasks/:taskId', async (ctx) => {
  try {
    const boardId = ctx.params.boardId;
    const taskId = ctx.params.taskId;

    const isTaskDeleted = taskService.deleteTask(boardId, taskId);

    if (isTaskDeleted) {
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
});

module.exports = routerTask;
