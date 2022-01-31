import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { LoginJwtGuard } from '../login/login-jwt.guard';

@Controller('boards/:boardId/tasks')
@UseGuards(LoginJwtGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Param('boardId') boardId: string, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(boardId, createTaskDto);
  }


  @Get()
  findAll(@Param('boardId') boardId: string) {
    return this.taskService.findAll(boardId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('boardId') boardId: string,) {
    return this.taskService.findOne(id, boardId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Param('boardId') boardId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, boardId, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Param('boardId') boardId: string,) {
    return this.taskService.remove(id, boardId);
  }
}
