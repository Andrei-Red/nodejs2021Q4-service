"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const db_1 = require("../db");
class TaskService {
    constructor() {
        this.db = db_1.db;
    }
    getTasks(boardId) {
        return this.db.tacks.filter((t) => t.boardId === boardId);
    }
    getTaskById(boardId, taskId) {
        return this.db.tacks.find((t) => t.id === taskId);
    }
    addTask(task) {
        this.db.tacks.push(task);
        return task;
    }
    updateTask(boardId, taskId, newTask) {
        const thisTask = this.db.tacks.find((t) => t.id === taskId);
        const { title, order, description } = newTask;
        if (thisTask) {
            thisTask.title = title;
            thisTask.order = order;
            thisTask.description = description;
        }
        return thisTask;
    }
    deleteTask(boardId, taskId) {
        const taskIndex = this.db.tacks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
            this.db.tacks.splice(taskIndex, 1);
            return true;
        }
        return false;
    }
}
exports.TaskService = TaskService;
