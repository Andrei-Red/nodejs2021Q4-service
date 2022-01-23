import { getRepository } from 'typeorm';
import { User } from '../entities/User';


export const get = async (login: string): Promise<User | boolean>  => {
  const user =  await getRepository(User).findOne({login}, {
    select: ['id', 'login', 'name', 'password']
  })

  if(!user) {
    return false
  }

  return user
}