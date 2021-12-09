import { TTrelloDB } from '../db';
import { IBoard } from '../models/Board';

const db = require('../db');

interface IBoarderService {
  db: TTrelloDB;

  getBoard(): IBoard[];
  getBoardById(id: string): IBoard;
  addBoard(board: IBoard): IBoard;
  updateBoard(id: string, newBoard: string): IBoard;
  deleteBoard(id: string): boolean;
  _deleteBoardSTacks(id: string): void;
}

class BoarderService implements IBoarderService {
  db: TTrelloDB;

  constructor() {
    this.db = db;
  }

  getBoard(): IBoard[] {
    return this.db.boards;
  }

  getBoardById(id: string): IBoard {
    return this.db.boards.find((u) => u.id === id);
  }

  addBoard(board: IBoard): IBoard {
    this.db.boards.push(board);
    return board;
  }

  updateBoard(id, newBoard): IBoard {
    const board = this.db.boards.find((u) => u.id === id);
    board.title = newBoard.title;
    board.columns = newBoard.columns;
    return board;
  }

  deleteBoard(id): boolean {
    const boardIndex = this.db.boards.findIndex((b) => b.id === id);
    if (boardIndex !== -1) {
      this.db.boards.splice(boardIndex, 1);
      this._deleteBoardSTacks(id);
      return true;
    }
    return false;
  }

  _deleteBoardSTacks(id): void {
    this.db.tacks = this.db.tacks.filter((t) => t.boardId !== id);
  }
}

module.exports = BoarderService;
