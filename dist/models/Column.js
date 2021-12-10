"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const { v4 } = require('uuid');
class Column {
    constructor(column = {}) {
        this.id = v4();
        this.title = column.title;
        this.order = column.order;
    }
}
exports.Column = Column;
