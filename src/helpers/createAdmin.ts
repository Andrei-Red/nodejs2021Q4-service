import { getConnection } from 'typeorm';
import { createHash } from './bcryptHash';
import { User } from '../users/user.model';

export const initDB = async (): Promise<void> => {
  const connection = getConnection()

  connection
    .createQueryBuilder()
    .insert()
    .into(User)
    .values([{ name: 'admin', login: 'admin', password: createHash('admin')  }])
    .execute()
    .catch(() => {
      process.stderr.write('Can not create "admin" user');
    });
};