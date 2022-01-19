import { getRepository } from 'typeorm';
import { Board } from '../entities/Board';
import { QueryAnswers } from '../types';


const getAll = async (): Promise<Board[]> => getRepository(Board).find();

const get = async (id: string): Promise<Board | QueryAnswers.NOT_FOUND> => {
  const boards = getRepository(Board);
  const board = await boards.findOne({ id });
  if (!board) return QueryAnswers.NOT_FOUND;

  return board;
};

const create = async (
  boardData: Board
): Promise<Board | QueryAnswers.NOT_FOUND> => {
  const boards = getRepository(Board);
  const brd = await boards.create(boardData);
  if (!brd) return QueryAnswers.NOT_FOUND;

  return boards.save(brd);
};

const update = async (
  id: string,
  boardData: Partial<Board>
): Promise<Board | QueryAnswers.NOT_FOUND> => {
  const boards = getRepository(Board);
  const brd = await boards.findOne({ id });
  if (!brd) return QueryAnswers.NOT_FOUND;

  await boards.merge(brd, boardData);
  return boards.save(brd);
};

const remove = async (
  id: string
): Promise<boolean> => {
  const result = await getRepository(Board).delete({ id });
  if (!result) return false;

  return true
};

export { getAll, get, create, update, remove };