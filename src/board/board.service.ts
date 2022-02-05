import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.model';
import { DeleteResult, Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-boerd.dto';
import { CustomError } from '../helpers/CustomError';

@Injectable()
export class BoardService {

  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>
  ) {}

  async create(createBoardDto: CreateBoardDto) {
    const newBoard = this.boardsRepository.create(createBoardDto);
    return this.boardsRepository.save(newBoard);
  }

  async findAll() {
    return this.boardsRepository.find();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardsRepository.findOne({ id });
    if (!board) {
      throw new HttpException(
        { message: `Board with id: ${id} not found.` },
        HttpStatus.NOT_FOUND
      );
    }

    return board;
  }

  async update(id: string,  updateBoardDto: UpdateBoardDto): Promise<Board | null> {
    const board = await this.boardsRepository.findOneOrFail({ id });
    if (!board) {
      throw new CustomError(
        HttpStatus.NOT_FOUND,
        `Not found board with id: ${id}`
      );
    }

    this.boardsRepository.merge(board, updateBoardDto);
    return this.boardsRepository.save(board);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.boardsRepository.delete({ id });
  }
}
