import * as authRepo from '../repository/Auth.repository'
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = process.env

export class AuthService {

  static async getUserByLogin(login: string) {
    return authRepo.get(login)
  }

  static async signToken(login: string, password: string) {
    const users = await getRepository(User).find({
      select: ['id', 'login', 'name', 'password'],
    });

    const currentUser = users.find((u) => (u.login === login && u.password === password))

    if(currentUser) {
      return jwt.sign({login, password}, SECRET_KEY)
    }
    return false
  }
}