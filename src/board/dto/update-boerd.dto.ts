import { Column } from '../coloms.model';

export class UpdateBoardDto {
  readonly title: string = 'Board';
  readonly columns: Column[] = [];
}