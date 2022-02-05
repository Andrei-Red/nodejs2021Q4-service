import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';


export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  title?: string;
  order?: number;
  description?: string;
  userId: string | null = null;
  boardId: string | null = null;
  columnId: string | null = null;
}