const db = require('../db')

class TaskService {
  constructor() {
    this.db = db
  }

  getTasks(boardId) {
    return this.db.tacks.filter(t => t.boardId === boardId)
  }

  getTaskById(boardId, taskId) {
    return this.db.tacks.find(t => t.id === taskId)
  }

  addTask(task) {
    this.db.tacks.push(task)
    return task
  }

  updateTask(boardId, taskId, newTask) {
    const thisTask = this.db.tacks.find(t => t.id === taskId)
    const {title, order, description} = newTask
    thisTask.title = title
    thisTask.order = order
    thisTask.description = description
    // thisTask.borderId = borderId
    // thisTask.columnsId = columnsId
    // thisTask.userId = userId

    return thisTask
  }

  deleteTask(boardId, taskId) {
    const taskIndex = this.db.tacks.findIndex((t) => t.id === taskId);
    if(taskIndex !== -1) {
      this.db.tacks.splice(taskIndex,1)
      return true
    } else {
      return false
    }
  }
}

module.exports = TaskService