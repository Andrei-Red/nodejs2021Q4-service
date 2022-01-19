import { getRepository } from 'typeorm';
import { Task } from '../entities/Task';
import { QueryAnswers } from '../types';


const getAll = async (boardId: string): Promise<Task[]> => {
  return getRepository(Task).find({ boardId });
};

const get = async (
  taskId: string
): Promise<Task | QueryAnswers.NOT_FOUND> => {
  const task = await getRepository(Task).findOne({
    id: taskId
  });

  if (!task) return QueryAnswers.NOT_FOUND;

  return task;
};

const create = async (taskData: Task): Promise<Task> => {
  const tasks = getRepository(Task);
  const task = await tasks.create(taskData);
  return tasks.save(task);
};

const update = async (
  taskId: string,
  taskData: Partial<Task>
): Promise<Task | QueryAnswers.NOT_FOUND> => {
  const tasks = getRepository(Task);
  const tsk = await tasks.findOne({ id: taskId });
  if (!tsk) return QueryAnswers.NOT_FOUND;

  tasks.merge(tsk, taskData);

  return tasks.save(tsk);
};

const remove = async (
  taskId: string
): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> => {
  const result = await getRepository(Task).delete({
    id: taskId
  });

  if (!result) return QueryAnswers.NOT_FOUND;

  return QueryAnswers.DELETED;
};

// const deleteUserFromTask = async (
//   userId: string
// ): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> => {
//   const tasks = await getRepository(Task).find({ userId });
//   try {
//     tasks.forEach((task) => {
//       update(task.boardId, task.id, { userId: null });
//     });
//     return QueryAnswers.DELETED;
//   } catch (e) {
//     return QueryAnswers.NOT_FOUND;
//   }
// };

// const deleteTasksFromBoard = async (
//   boardId: string
// ): Promise<QueryAnswers.DELETED | QueryAnswers.NOT_FOUND> => {
//   try {
//     tasks = tasks.filter((task) => task.boardId !== boardId);
//     return QueryAnswers.DELETED;
//   } catch (e) {
//     return QueryAnswers.NOT_FOUND;
//   }
// };

export {
  getAll,
  get,
  create,
  update,
  remove,
  // deleteTasksFromBoard,
  // deleteUserFromTask,
};