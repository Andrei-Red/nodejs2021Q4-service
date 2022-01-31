import { HttpStatus, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { User } from './user.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { createHash } from '../helpers/bcryptHash';
import { CustomError } from '../helpers/CustomError';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(userDto: CreateUserDto) {
    const passwordHash = createHash(userDto.password);
    const newUser = await this.usersRepository.create({
      ...userDto,
      password: passwordHash,
    });
    const user = await this.usersRepository.save(newUser);

    return User.toResponse(user);
  }

  async findAll() {
    const users = await this.usersRepository.find();
    return users.map((user) => User.toResponse(user));
  }

  async findByLogin(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ login });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({ id });
    if(user) {
      return user
    } else {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Not correct user id: ${id}`
      )
    }
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User | null> {
    const user = await this.usersRepository.findOne({ id });
    if(!user) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Not correct user id: ${id}`
      )
    }

    this.usersRepository.merge(user, userDto);
    const newUser = await this.usersRepository.save(user);
    return User.toResponse(newUser) as User;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete({ id });
  }
}
