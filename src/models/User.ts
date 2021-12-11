const { v4 } = require('uuid');

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

class User implements IUser {
  id: string;
  name: string;
  login: string;
  password: string;

  constructor(user: IUser = {} as IUser) {
    this.id = v4();
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }

  /**
   * Getting user data without password.
   *
   * @param user - The first input IUser
   * @returns Object as IUser without password
   *
   */
  static toResponse(user: IUser) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
