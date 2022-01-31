import { forwardRef, Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.model';
import { Task } from '../task/task.model';
import { LoginModule } from '../login/login.module';

@Module({
  controllers: [BoardController],
  providers: [BoardService],
  imports: [TypeOrmModule.forFeature([Board, Task]), forwardRef(() => LoginModule),]
})
export class BoardModule {}
