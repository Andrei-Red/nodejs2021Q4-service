const { v4 } = require('uuid');

export interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

class Task implements ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;

  constructor(task = {} as ITask) {
    this.id = v4();
    this.title = task.title;
    this.order = task.order;
    this.description = task.description;
    this.userId = task.userId;
    this.boardId = task.boardId;
    this.columnId = task.columnId;
  }
}

module.exports = Task;
