import { BoardModel } from '../db/models/index.js';
// import { hashPassword, randomPassword } from '../misc/utils';
// import AppError from '../misc/AppError';

class BoardService {
  constructor(boardModel) {
    this.boardModel = boardModel;
  }
  async getBoards() {
    return await this.boardModel.find();
  }
  async getBoardsByMbti(category) {
    return await this.boardModel.findMBTI(category);
  }
  async getBoard(id) {
    return await this.boardModel.findById(id);
  }
  async addBoard(board) {
    return await this.boardModel.create(board);
  }
  async updateBoardLikes(id) {
    return await this.boardModel.updateLike(id);
  }
  async deleteBoard(id) {
    return await this.boardModel.delete(id);
  }
}

export default new BoardService(BoardModel);
