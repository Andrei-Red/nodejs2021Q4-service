import { TTrelloDB } from '../db';
import { IBoard } from '../models/Board';

const db = require('../db');

interface IBoarderService {
  db: TTrelloDB;

  getBoard(): IBoard[];
  getBoardById(id: string): IBoard | undefined;
  addBoard(board: IBoard): IBoard;
  updateBoard(id: string, newBoard: IBoard): IBoard | undefined;
  deleteBoard(id: string): boolean;
  _deleteBoardSTacks(id: string): void;
}

class BoarderService implements IBoarderService {
  db: TTrelloDB;

  constructor() {
    this.db = db;
  }

  getBoard() {
    return this.db.boards;
  }

  getBoardById(id: string) {
    return this.db.boards.find((u) => u.id === id);
  }

  addBoard(board: IBoard) {
    this.db.boards.push(board);
    return board;
  }

  updateBoard(id: string, newBoard: IBoard) {
    const board = this.db.boards.find((u: IBoard) => u.id === id);
    if (board) {
      board.title = newBoard.title;
      board.columns = newBoard.columns;
      return board;
    }
  }

  deleteBoard(id: string) {
    const boardIndex = this.db.boards.findIndex((b: IBoard) => b.id === id);
    if (boardIndex !== -1) {
      this.db.boards.splice(boardIndex, 1);
      this._deleteBoardSTacks(id);
      return true;
    }
    return false;
  }

  _deleteBoardSTacks(id: string) {
    this.db.tacks = this.db.tacks.filter((t) => t.boardId !== id);
  }
}

module.exports = BoarderService;
