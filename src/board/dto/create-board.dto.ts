import { ColumnDto } from './create-colomn.dto';

export class CreateBoardDto {
  readonly title: string = 'Board';
  readonly columns: ColumnDto[] = [];
}