import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.model';
import { Board } from '../board/board.model';
import { v4 } from 'uuid';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  title: string;

  @Column('integer')
  order: number;

  @Column('varchar')
  description: string;

  @Column('varchar', { nullable: true })
  userId: string | null;

  @ManyToOne(() => User, (user: User) => user.id, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'userId' })
  user!: string | null;

  @Column('varchar', { nullable: true })
  boardId: string | null;

  @ManyToOne(() => Board, (board: Board) => board.id, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'boardId' })
  board!: string | null;

  @Column('varchar', { nullable: true })
  columnId: string | null;

  constructor({
                id = v4(),
                title = 'Task',
                description = 'Description',
                order = 0,
                userId = null,
                boardId = null,
                columnId = null,
              }: Partial<Task> = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}