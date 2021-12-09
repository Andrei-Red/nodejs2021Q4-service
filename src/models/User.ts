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

  constructor(user = {} as IUser) {
    this.id = v4();
    this.name = user.name;
    this.login = user.login;
    this.password = user.password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
