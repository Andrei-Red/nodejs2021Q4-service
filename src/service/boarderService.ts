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


  /**
   * Getting all Boards.
   *
   * @returns Array Boards of type IBoard
   *
   */
  getBoard() {
    return this.db.boards;
  }

  /**
   * Getting a Board by ID.
   *
   * @param id - The first input string. it is ID Board
   * @returns Board of type IBoard
   *
   */
  getBoardById(id: string) {
    return this.db.boards.find((u) => u.id === id);
  }

  /**
   * Add a Board to Boards Array.
   *
   * @param board - The first input IBoard
   * @returns Board of type IBoard or undefined if Board not found
   *
   */
  addBoard(board: IBoard) {
    this.db.boards.push(board);
    return board;
  }

  /**
   * Update a Board to Boards Array.
   *
   * @param id - The first input string
   * @param newBoard - The second input IBoard
   * @returns Board of type IBoard or undefined if Board not found
   *
   */
  updateBoard(id: string, newBoard: IBoard) {
    const board = this.db.boards.find((u: IBoard) => u.id === id);
    if (board) {
      board.title = newBoard.title;
      board.columns = newBoard.columns;
    }
    return board;
  }

  /**
   * Delete a Board to Boards Array.
   *
   * @param id - The first input string
   * @returns Boolean true if a good action else false
    *
   */
  deleteBoard(id: string) {
    const boardIndex = this.db.boards.findIndex((b: IBoard) => b.id === id);
    if (boardIndex !== -1) {
      this.db.boards.splice(boardIndex, 1);
      this._deleteBoardSTacks(id);
      return true;
    }
    return false;
  }
  /**
   * Delete Boards in Tasks Array.
   *
   * @param id - The first input string
   * @returns void
   *
   */
  _deleteBoardSTacks(id: string) {
    this.db.tacks = this.db.tacks.filter((t) => t.boardId !== id);
  }
}

module.exports = BoarderService;
