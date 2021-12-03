const { v4 } = require('uuid');
const Column = require('./Column')

class Board {
  constructor(board = {}) {
      this.id =  v4();
      this.title = board.title;
      this.columns = []
      this.columns.push(new Column('title', '1'));
  }
}

module.exports = Board