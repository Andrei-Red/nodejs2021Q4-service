const { v4 } = require('uuid');

class Column {
  constructor(column = {}) {
      this.id =  v4();
      this.title = column.title;
      this.order = column.order;
  }
}

module.exports = Column