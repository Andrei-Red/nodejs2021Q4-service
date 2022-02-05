import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.model';
import { Board } from '../board/board.model';
import { LoginModule } from '../login/login.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task, Board]), forwardRef(() => LoginModule)]
})
export class TaskModule {}
