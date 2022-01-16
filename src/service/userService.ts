import { TTrelloDB } from '../db';
import { IUser } from '../models/User';
import { ITask } from '../models/Task';
import * as usersRepo from '../repository/User.repository';

const db = require('../db');

export interface IUserService {
  db: TTrelloDB;

  getUsers(): IUser[];
  getUsersById(id: string): IUser | undefined;
  addUser(user: IUser): IUser;
  updateUser(id: string, newUser: IUser): IUser | undefined;
  deleteUser(id: string): boolean;
  _updateUserIdInTacks(userId: string): void;
}

class UserService {
  db: TTrelloDB;

  constructor() {
    this.db = db;
  }

  /**
   * Getting all Users in Users Array.
   *
   * @returns Array Users of type IUser
   *
   */
  getUsers() {
    return usersRepo.getAll();
  }

  /**
   * Getting the User by User in in Users Array.
   *
   * @param id - The first input string. it is User ID
   * @returns Array Users of type IUser or undefined if User not found
   *
   */
  getUsersById(id: string) {
    return  usersRepo.get(id);
  }

  /**
   * Add the User to Users Array.
   *
   * @param user - The first input IBoard
   * @returns User Users of type IUser
   *
   */
  addUser(user: IUser) {
    return usersRepo.create(user);
  }

  /**
   * Update the User in Users Array.
   *
   * @param id - The first input string
   * @param newUser - The second input IUser
   * @returns User Users of type IUser or undefined if User not found
   *
   */
  updateUser(id: string, newUser: IUser) {
    return  usersRepo.update(id, newUser);
  }

  /**
   * Delete the User to Users Array.
   *
   * @param id - The first input string
   * @returns Boolean true if a good action else false
   *
   */
  deleteUser(id: string) {
    const userIndex = this.db.users.findIndex((u: IUser) => u.id === id);
    if (userIndex !== -1) {
      return usersRepo.remove(id).then(() => true)
    }
    return false;
  }

  /**
   * Update userId field in User. Set null value.
   *
   * @param userId - The first input string
   * @returns Void
   *
   */
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

module.exports = UserService;
