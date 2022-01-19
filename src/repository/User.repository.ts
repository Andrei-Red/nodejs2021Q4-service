import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { QueryAnswers } from '../types';


const getAll = async (): Promise<User[]> => {
  return await getRepository(User).find({
    select: ['id', 'login', 'name'],
  });
};

const get = async (id: string): Promise<User | QueryAnswers.NOT_FOUND> => {
  const user = await getRepository(User).findOne(
    { id },
    {
      select: ['id', 'login', 'name'],
    }
  );
  if (!user) {
    return QueryAnswers.NOT_FOUND;
  }

  return user;
};

const create = async (
  userData: User
): Promise<User | QueryAnswers.NOT_FOUND> => {
  const users = getRepository(User);
  const user = await users.create(userData);
  if (!user) return QueryAnswers.NOT_FOUND;

  return users.save(user);
};

const update = async (
  id: string,
  userData: Partial<User>
): Promise<User | QueryAnswers.NOT_FOUND> => {
  const users = getRepository(User);
  const user = await users.findOne({ id });
  if (!user) return QueryAnswers.NOT_FOUND;

  await users.merge(user, userData);
  return users.save(user);
};

const remove = async (
  userId: string
): Promise<boolean> => {
  const result = await getRepository(User).delete({ id: userId });
  if (!result) {
    return false
  }
  return true
};

export { getAll, get, create, update, remove };