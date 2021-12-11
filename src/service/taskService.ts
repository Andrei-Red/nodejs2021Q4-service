import { TTrelloDB } from '../db';
import { ITask } from '../models/Task';

const db = require('../db');

interface ITaskService {
  db: TTrelloDB;

  getTasks(boardId: string): ITask[];
  getTaskById(taskId: string): ITask | undefined;
  addTask(task: ITask): ITask;
  updateTask(
    taskId: string,
    newTask: ITask
  ): ITask | undefined;
  deleteTask(taskId: string): boolean;
}

class TaskService implements ITaskService {
  db: TTrelloDB;

  constructor() {
    this.db = db;
  }

  getTasks(boardId: string) {
    return this.db.tacks.filter((t) => t.boardId === boardId);
  }

  getTaskById(taskId: string) {
    return this.db.tacks.find((t: ITask) => t.id === taskId);
  }

  addTask(task: ITask) {
    this.db.tacks.push(task);
    return task;
  }

  updateTask(taskId: string, newTask: ITask) {
    const thisTask = this.db.tacks.find((t: ITask) => t.id === taskId);
    const { title, order, description } = newTask;
    if (thisTask) {
      thisTask.title = title;
      thisTask.order = order;
      thisTask.description = description;
    }
    return thisTask;
  }

  deleteTask(taskId: string) {
    const taskIndex = this.db.tacks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      this.db.tacks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }
}

module.exports = TaskService;
