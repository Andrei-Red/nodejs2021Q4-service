import { IUser } from './models/User';
import { IBoard } from './models/Board';
import { ITask } from './models/Task';
import { IColumn } from './models/Column';

export type TTrelloDB = {
  users: IUser[];
  boards: IBoard[];
  tacks: ITask[];
  columns: IColumn[];
};

export const db: TTrelloDB = {
  users: [],
  boards: [],
  tacks: [],
  columns: [],
};
