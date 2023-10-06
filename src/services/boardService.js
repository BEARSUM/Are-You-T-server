import { BoardModel } from '../db/models/index.js';
import bcrypt from 'bcrypt';
import { hashPassword } from '../misc/utils.js';
import AppError from '../misc/AppError.js';

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
    const { password, category, title, content, color } = board;
    const hashedPassword = await hashPassword(password);
    return await this.boardModel.create({ hashedPassword, category, title, content, color });
  }
  async checkBoardInfo(id, pw) {
    const board = await this.boardModel.findByIdWithPw(id);
    const isPasswordCorrect = bcrypt.compareSync(pw, board.password);
    if (!isPasswordCorrect) {
      throw new AppError('Bad Request', 400, 'PW를 확인해 주세요.');
    }
    board.password = pw;
    return board;
  }
  async updateBoard(id, board) {
    const { password, category, title, content, color } = board;
    const hashedPassword = await hashPassword(password);
    return await this.boardModel.update(id, { hashedPassword, category, title, content, color });
  }
  async updateBoardLikes(id) {
    return await this.boardModel.updateLike(id);
  }
  async deleteBoard(id) {
    return await this.boardModel.delete(id);
  }
}

export default new BoardService(BoardModel);
