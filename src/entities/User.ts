import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
const { v4 } = require('uuid');

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 50 })
  login: string;

  @Column('varchar', { length: 150 })
  password: string;

  constructor({
                id = v4(),
                login = '',
                name = '',
                password = '',
              }: Partial<User> = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user: User): Partial<User> {
    const { id, name, login } = user;
    return { id, name, login };
  }
}