import { TTrelloDB , db } from '../db';
import { IUser } from '../models/User';
import { ITask } from '../models/Task';


interface IUserService {
  db: TTrelloDB;

  getUsers(): IUser[];
  getUsersById(id: string): IUser | undefined;
  addUser(user: IUser): IUser;
  updateUser(id: string, newUser: IUser): IUser | undefined;
  deleteUser(id: string): boolean;
  _updateUserIdInTacks(userId: string): void;
}

export class UserService implements IUserService {
  db: TTrelloDB;

  constructor() {
    this.db = db;
  }

  getUsers() {
    return this.db.users;
  }

  getUsersById(id: string): IUser | undefined {
    return this.db.users.find((u: IUser) => u.id === id);
  }

  addUser(user: IUser): IUser {
    this.db.users.push(user);
    return user;
  }

  updateUser(id: string, newUser: IUser): IUser | undefined {
    const user = this.db.users.find((u: IUser) => u.id === id);
    if (user) {
      user.name = newUser.name;
      user.login = newUser.login;
    }
    return user;
  }

  deleteUser(id: string) {
    const userIndex = this.db.users.findIndex((u: IUser) => u.id === id);
    if (userIndex !== -1) {
      this.db.users.splice(userIndex, 1);
      this._updateUserIdInTacks(id);
      return true;
    }
    return false;
  }

  _updateUserIdInTacks(userId: string) {
    function setNullValue(value: ITask) {
      const theValue = value;
      theValue.userId = null;
    }

    this.db.tacks.forEach((task: ITask) => {
      if (task.userId === userId) {
        setNullValue(task);
      }
    });
  }
}
