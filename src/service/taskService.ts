import { TTrelloDB , db } from '../db';
import { ITask } from '../models/Task';


interface ITaskService {
  db: TTrelloDB;

  getTasks(boardId: string): ITask[];
  getTaskById(boardId: string, taskId: string): ITask | undefined;
  addTask(task: ITask): ITask;
  updateTask(
    boardId: string,
    taskId: string,
    newTask: ITask
  ): ITask | undefined;
  deleteTask(boardId: string, taskId: string): boolean;
}

export class TaskService implements ITaskService {
  db: TTrelloDB;

  constructor() {
    this.db = db;
  }

  getTasks(boardId: string): ITask[] {
    return this.db.tacks.filter((t) => t.boardId === boardId);
  }

  getTaskById(boardId: string, taskId: string): ITask | undefined {
    return this.db.tacks.find((t) => t.id === taskId);
  }

  addTask(task: ITask): ITask {
    this.db.tacks.push(task);
    return task;
  }

  updateTask(
    boardId: string,
    taskId: string,
    newTask: ITask
  ): ITask | undefined {
    const thisTask = this.db.tacks.find((t) => t.id === taskId);
    const { title, order, description } = newTask;
    if (thisTask) {
      thisTask.title = title;
      thisTask.order = order;
      thisTask.description = description;
    }
    return thisTask;
  }

  deleteTask(boardId: string, taskId: string): boolean {
    const taskIndex = this.db.tacks.findIndex((t) => t.id === taskId);
    if (taskIndex !== -1) {
      this.db.tacks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }
}
