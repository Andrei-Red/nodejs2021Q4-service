// interface ITrelloDB {
//   users:
// }
//
// interface IUser {
//
// }

import { IUser } from './models/User';
import { IBoard } from './models/Board';
import { ITask } from './models/Task';
import { IColumn } from './models/Column';

export type TTrelloDB = {
  users: IUser[],
  boards: IBoard[],
  tacks: ITask[],
  columns: IColumn[]
}

const trelloDB: TTrelloDB = {
  users: [],
  boards: [],
  tacks: [],
  columns: []
};

module.exports = trelloDB;

// { id: '123', name: 'Andrei', login: "Red" }