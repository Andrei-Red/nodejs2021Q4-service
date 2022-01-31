import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnEntity,
} from 'typeorm';
import { v4 } from 'uuid';

@Entity()
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnEntity('varchar', { length: 50 })
  title: string;

  @ColumnEntity('int')
  order: number;

  constructor({ id = v4(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}