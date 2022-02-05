import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-boerd.dto';
import { LoginJwtGuard } from '../login/login-jwt.guard';

@Controller('boards')
@UseGuards(LoginJwtGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() board: CreateBoardDto) {
    return this.boardService.create(board);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() board: UpdateBoardDto) {
    return this.boardService.update(id, board);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(id);
  }
}
