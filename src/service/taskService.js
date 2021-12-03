const db = require('../db')

class TaskService {
  constructor() {
    this.db = db
  }

  getTasks(boardId) {
    return this.db.tacks.filter(t => t.boardId === boardId)
  }

  getTaskById(boardId, taskId) {
    // const boardTasks = this.db.tacks.filter(t => t.boardId === boardId)
    return this.db.tacks.filter.filter(t => t.id === taskId)
  }

  addTask(task) {
    this.db.tacks.push(task)
    return task
  }

  updateTask(boardId, taskId, newTask) {
    // const boardTasks = this.db.tacks.filter(t => t.boardId === boardId)
    const thisTask = this.db.tacks.filter(t => t.id === taskId)
    const {title, order, description} = newTask
    thisTask.titlt = title
    thisTask.order = order
    thisTask.description = description
    // thisTask.borderId = borderId
    // thisTask.columnsId = columnsId
    // thisTask.userId = userId


    return thisTask
  }

  deleteTask(boardId, taskId) {
    const taskIndex = this.db.tacks.findIndex((t) => t.id === taskId);
    if(taskIndex) {
      this.db.users.splice(taskIndex,1)
      return true
    } else {
      return false
    }
  }
}

module.exports = TaskService