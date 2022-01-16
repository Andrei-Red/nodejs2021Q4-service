import { EntityRepository, Repository, getConnection } from 'typeorm';
import { IUser, User } from '../models/User';



@EntityRepository(User)
class UsersRepository extends Repository<User> {
  getAll() {
    return this.createQueryBuilder().getMany();
  }

  async createUser(user: Partial<IUser>) {
    const {identifiers} = await this.createQueryBuilder()
      .insert()
      .into(User)
      .values([user])
      .execute();

    return this.getUserById(identifiers[0]?.['id'])
  }

  getUserById(id: string) {
    return this.createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
  }

  async updateUser(id: string, updatedUser: Partial<IUser>) {
    await this.createQueryBuilder()
      .update(User)
      .set(updatedUser)
      .where('id = :id', { id })
      .execute();

    return this.getUserById(id)
  }

  deleteUserById(id: string) {
    return this.createQueryBuilder()
      .delete()
      .from(User)
      .where('id = :id', { id })
      .execute();
  }
}

export const usersRepository = getConnection().getCustomRepository(UsersRepository);