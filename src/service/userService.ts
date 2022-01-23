import { TTrelloDB } from '../db';
import { IUser } from '../models/User';
import * as usersRepo from '../repository/User.repository';


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

  constructor() {
  }

  /**
   * Getting all Users in Users Array.
   *
   * @returns Array Users of type IUser
   *
   */
  async getUsers(): Promise<any[]> {
    return usersRepo.getAll()
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
  async deleteUser(id: string) {
    return  await usersRepo.remove(id)
  }

  /**
   * Update userId field in User. Set null value.
   *
   * @param userId - The first input string
   * @returns Void
   *
   */

}

module.exports = UserService;
