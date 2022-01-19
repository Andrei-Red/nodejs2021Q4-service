import { TTrelloDB } from '../db';
import { IBoard } from '../models/Board';
import * as boardRepo from '../repository/Board.repository';

const db = require('../db');

export interface IBoarderService {
  db: TTrelloDB;

  getBoard(): IBoard[];
  getBoardById(id: string): IBoard | undefined;
  addBoard(board: IBoard): IBoard;
  updateBoard(id: string, newBoard: IBoard): IBoard | undefined;
  deleteBoard(id: string): boolean;
  _deleteBoardSTacks(id: string): void;
}

class BoarderService {
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
    return boardRepo.getAll();
  }

  /**
   * Getting a Board by ID.
   *
   * @param id - The first input string. it is ID Board
   * @returns Board of type IBoard
   *
   */
  getBoardById(id: string) {
    return boardRepo.get(id);
  }

  /**
   * Add a Board to Boards Array.
   *
   * @param board - The first input IBoard
   * @returns Board of type IBoard or undefined if Board not found
   *
   */
  addBoard(board: IBoard) {
    return boardRepo.create(board);
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
    return boardRepo.update(id, newBoard);
  }

  /**
   * Delete a Board to Boards Array.
   *
   * @param id - The first input string
   * @returns Boolean true if a good action else false
    *
   */
  async deleteBoard(id: string) {
    return await boardRepo.remove(id)
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
