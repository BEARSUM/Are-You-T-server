import { BoardModel } from '../db/models/index.js';
// import { hashPassword, randomPassword } from '../misc/utils';
// import AppError from '../misc/AppError';

class BoardService {
  constructor(boardModel) {
    this.boardModel = boardModel;
  }
  async getAllBoards() {
    return await this.boardModel.find();
  }
  async getBoardsByMbti(category) {
    return await this.boardModel.findMBTI(category);
  }
  async addBoard(board) {
    return await this.boardModel.create(board);
  }
}

export default new BoardService(BoardModel);
