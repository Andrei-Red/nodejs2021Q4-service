import { IBoard } from './models/Board';
import { IUser } from './models/User';
import { ITask } from './models/Task';
import { IColumn } from './models/Column';

export type TTrelloDB = {
  users: IUser[];
  boards: IBoard[];
  tacks: ITask[];
  columns: IColumn[];
};

const trelloDB: TTrelloDB = {
  users: [],
  boards: [],
  tacks: [],
  columns: [],
};

module.exports = trelloDB;
