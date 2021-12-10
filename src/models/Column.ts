const { v4 } = require('uuid');

export interface IColumn {
  id: string;
  title: string;
  order: number;
}

class Column implements IColumn {
  id: string;
  title: string;
  order: number;

  constructor(column: IColumn = {} as IColumn) {
    this.id = v4();
    this.title = column.title;
    this.order = column.order;
  }
}

module.exports = Column;
