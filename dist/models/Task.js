"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const { v4 } = require('uuid');
class Task {
    constructor(task = {}) {
        this.id = v4();
        this.title = task.title;
        this.order = task.order;
        this.description = task.description;
        this.userId = task.userId;
        this.boardId = task.boardId;
        this.columnId = task.columnId;
    }
}
exports.Task = Task;
