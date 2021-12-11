const db = require('../db');

class BoarderService {
  constructor() {
    this.db = db
  }

  getBoard() {
    return this.db.boards;
  }

  getBoardById(id) {
    return this.db.boards.find((u) => u.id === id);
  }

  addBoard(board) {
    this.db.boards.push(board)
    return board
  }

  updateBoard(id, newBoard) {
    const board = this.db.boards.find((u) => u.id === id);
    board.title = newBoard.title
    board.columns = newBoard.columns
    return board
  }

  deleteBoard(id) {
    const boardIndex = this.db.boards.findIndex((b) => b.id === id);
    if(boardIndex !== -1) {
      this.db.boards.splice(boardIndex,1)
      this._deleteBoardSTacks(id)
      return true
    } 
      return false
    
  }

  _deleteBoardSTacks (id) {
    this.db.tacks = this.db.tacks.filter((t) => t.boardId !== id)
  }
}

module.exports = BoarderService