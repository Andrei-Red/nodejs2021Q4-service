const { v4 } = require('uuid');

export interface IAuth {
  id: string;
  login: string;
  password: string;
}

export class Auth implements IAuth{
  id: string;
  login: string;
  password: string;

  constructor(login: string, password: string) {
    this.id = v4()
    this.login = login
    this.password = password
  }
}