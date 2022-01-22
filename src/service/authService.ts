import * as loginRepo from '../repository/Auth.repository'

export class AuthService {

  static async auth(login: string) {
    return loginRepo.get(login)
  }
}