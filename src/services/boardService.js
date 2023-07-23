import { BoardModel } from '../db/models/index.js';
// import { hashPassword, randomPassword } from '../misc/utils';
// import AppError from '../misc/AppError';

class BoardService {
  constructor(boardModel) {
    this.boardModel = boardModel;
  }
  async postBoard(board) {
    const newBoard = await this.boardModel.create(board);
    return newBoard;
  }
}

// module.exports = new BoardService(boardModel);
export default new BoardService(BoardModel);
