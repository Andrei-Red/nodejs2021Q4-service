"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const { v4 } = require('uuid');
class Board {
    constructor(board = {}) {
        this.id = v4();
        this.title = board.title;
        this.columns = board.columns;
    }
}
exports.Board = Board;
