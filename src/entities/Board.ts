import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnEntity,
} from 'typeorm';
import { Column } from './Coloms';

const { v4 } = require('uuid');

@Entity({ name: 'board' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnEntity('varchar', { length: 50 })
  title: string;

  @ColumnEntity('jsonb', { nullable: true })
  columns?: Column[];

  constructor({
                id = v4(),
                title = 'Board',
                columns = [],
              }: Partial<Board> = {}) {
    this.id = id;
    this.title = title;
    this.columns = Board.createColumns(columns);
  }

  static createColumns(columns: Column[] | null): Column[] {
    if (Array.isArray(columns)) {
      return columns.map((col: Column) => new Column({ ...col }));
    }
    return [new Column()];
  }
}