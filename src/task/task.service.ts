import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.model';
import { CustomError } from '../helpers/CustomError';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    console.log('create(boardId', boardId);
    const newTask = await this.tasksRepository.create({ ...createTaskDto, boardId });
    return this.tasksRepository.save(newTask);
  }

  async findAll(boardId: string) {
    console.log('boardId', boardId);
    const tasks = await this.tasksRepository.find({ boardId });
    if (!tasks) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Error request tasks from board with id: ${boardId}`
      );
    }
    return tasks;

  }

  async findOne(id: string, boardId: string) {
    const task = await this.tasksRepository.findOne({ id });
    if (!task) {
      throw new HttpException(`No task with id: ${id}`, HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async update(id: string, boardId: string, updateTaskDto: UpdateTaskDto) {;
    const task = await this.tasksRepository.findOneOrFail({ id, boardId });

    if (!task) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Not found task with id: ${id}`
      );
    }

    this.tasksRepository.merge(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: string, boardId: string) {
    return this.tasksRepository.delete({ id, boardId });
  }
}
