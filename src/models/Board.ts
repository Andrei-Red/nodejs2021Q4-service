const { v4 } = require('uuid');

export interface IBoard {
  id: string;
  title: string;
  columns: [];
}

class Board implements IBoard {
  id: string;
  title: string;
  columns;

  constructor(board: IBoard = {} as IBoard) {
    this.id = v4();
    this.title = board.title;
    this.columns = board.columns;
  }
}

module.exports = Board;
