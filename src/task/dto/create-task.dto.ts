export class CreateTaskDto {
  title?: string;
  order?: number;
  description?: string;
  userId: string | null = null;
  boardId: string | null = null;
  columnId: string | null = null;
}