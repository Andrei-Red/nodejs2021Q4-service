import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Board, IBoard } from '../models/Board';



@EntityRepository(Board)
class BoardsRepository extends Repository<Board> {

  getAll() {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'columns')
      .getMany();
  }

  async addNewBoard(board: IBoard) {
    // const board = new Board();

    await this.setNewBoardData(board);

    return this.getBoardById(board.id);
  }

  async getBoardById(id: string) {
    return this.createQueryBuilder('board')
      .leftJoinAndSelect('board.columns', 'columns')
      .where('board.id = :id', { id })
      .getOne();
  }


  async updateBoard(id: string, { title, columns }: Partial<IBoard>) {
    await this.deleteColumnsForParticularBoardId(id);

    const exBoard = await this.createQueryBuilder('board')
      .where('board.id = :id', { id })
      .getOne();

    if (exBoard) {
      await this.setNewBoardData(exBoard, title, columns);

      return this.getBoardById(id);
    }

    return null;
  }

  async deleteBoardById(id: string) {
    await this.deleteColumnsForParticularBoardId(id);

    return this.createQueryBuilder()
      .delete()
      .from(Board)
      .where('id = :id', { id })
      .execute();
  }

  // async deleteColumnsForParticularBoardId(id: string) {
  //   const columns = await this.createQueryBuilder()
  //     .relation(Board, 'columns')
  //     .of(id)
  //     .loadMany();
  //
  //   await Promise.all(columns.map(async ({ id: columnId }) => {
  //     await this.createQueryBuilder()
  //       .delete()
  //       .from(ColumnModel)
  //       .where('id = :id', { id: columnId })
  //       .execute();
  //   }));
  // }

  async setNewBoardData(board: Board, title?: string) {
    const connectionManager = getConnection().manager;

    if (board) {
      board.title = title || board.title || '';

      await connectionManager.save(board);

      // if (columns) {
      //   await Promise.all(columns.map(async ({ id: columnId, title: columnTitle, order }) => {
      //     const column = new ColumnModel();
      //     column.id = columnId;
      //     column.title = columnTitle;
      //     column.order = order;
      //     column.board = board;
      //     await connectionManager.save(column);
      //   }));
      // }
    }
  }
}

export const boardsRepository = getConnection().getCustomRepository(BoardsRepository);