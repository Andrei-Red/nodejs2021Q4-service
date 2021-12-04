const { v4 } = require('uuid');

class Board {

  constructor(board = {}) {
      this.id =  v4();
      this.title = board.title;
      this.columns = board.columns
  }
}

module.exports = Board