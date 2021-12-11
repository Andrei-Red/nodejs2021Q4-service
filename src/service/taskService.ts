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

  /**
   * Getting all Tacks in the Board.
   *
   * @param boardId -The first input string.
   * @returns Array of type ITask
   *
   */
  getTasks(boardId: string) {
    return this.db.tacks.filter((t) => t.boardId === boardId);
  }

  /**
   * Getting a Tack by task id.
   *
   * @param taskId -The first input string.
   * @returns Task of type ITask or undefined if Task not found
   *
   */
  getTaskById(taskId: string) {
    return this.db.tacks.find((t: ITask) => t.id === taskId);
  }

  /**
   * Add a Tack to Tasks Array.
   *
   * @param task -The first input of type ITask.
   * @returns Task of type ITask
   *
   */
  addTask(task: ITask) {
    this.db.tacks.push(task);
    return task;
  }

  /**
   * Update a Tack to Tasks Array.
   *
   * @param taskId -The first input string.
   * @param newTask -The second input of type ITask.
   * @returns Task of type ITask or undefined if task not found
   *
   */
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

  /**
   * Delete a Tack to Tasks Array.
   *
   * @param taskId -The first input string.
   * @returns Boolean true if a good action else false
   *
   */
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
