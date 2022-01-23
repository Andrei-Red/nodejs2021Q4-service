import { TTrelloDB } from '../db';
import { ITask } from '../models/Task';
import * as taskRepo from '../repository/Task.repository';
import { Task } from '../entities/Task';

export interface ITaskService {
  db: TTrelloDB;

  getTasks(boardId: string): ITask[];
  getTaskById(taskId: string): ITask | undefined;
  addTask(task: ITask): ITask;
  updateTask(taskId: string, newTask: ITask): ITask | undefined;
  deleteTask(taskId: string): boolean;
}

class TaskService {
  constructor() {}
  /**
   * Getting all Tacks in the Board.
   *
   * @param boardId -The first input string.
   * @returns Array of type ITask
   *
   */
  getTasks(boardId: string) {
    return taskRepo.getAll(boardId);
  }

  /**
   * Getting a Tack by task id.
   *
   * @param taskId -The first input string.
   * @returns Task of type ITask or undefined if Task not found
   *
   */
  getTaskById(taskId: string) {
    return taskRepo.get(taskId);
  }

  /**
   * Add a Tack to Tasks Array.
   *
   * @param task -The first input of type ITask.
   * @returns Task of type ITask
   *
   */
  addTask(task: Task) {
    return taskRepo.create(task);
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
    return taskRepo.update(taskId, newTask);
  }

  /**
   * Delete a Tack to Tasks Array.
   *
   * @param taskId -The first input string.
   * @returns Boolean true if a good action else false
   *
   */
  async deleteTask(taskId: string) {
    return await taskRepo.remove(taskId);
  }
}

module.exports = TaskService;
