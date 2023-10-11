import { model } from 'mongoose';
import { BoardSchema } from '../schemas/index.js';

const Board = model('boards', BoardSchema);

class BoardModel {
  async find(boardInfo) {
    const { count, skip } = boardInfo;

    return await Board.aggregate([
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: count },
      {
        $project: {
          password: 0, // 비밀번호 제외
        },
      },
    ]);

    // return await Board.find({}, { password: 0 }).sort({ createdAt: -1 }).lean();
  }
  async findMBTI(boardInfo) {
    const { category, count, skip } = boardInfo;

    return await Board.aggregate([
      { $match: { category } },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: count },
      {
        $project: {
          password: 0, // 비밀번호 제외
        },
      },
    ]);

    return await Board.find({ category }, { password: 0 }).sort({ createdAt: -1 }).lean();
  }
  async findById(id) {
    return await Board.findById(id, { password: 0 }).lean();
  }
  async findByIdWithPw(id) {
    return await Board.findById(id).lean();
  }
  async create(board) {
    const { hashedPassword, category, title, content, color } = board;
    return (await Board.create({ password: hashedPassword, category, title, content, color })).toObject();
  }
  async update(id, board) {
    const { hassedPassword, category, title, content, color } = board;
    return await Board.findByIdAndUpdate(id, { hassedPassword, category, title, content, color }, { new: true }).lean();
  }
  async updateLike(id) {
    return (await Board.findByIdAndUpdate(id, { $inc: { like: 1 } }, { new: true })).toObject();
  }
  async delete(id) {
    return (await Board.findByIdAndDelete(id)).toObject();
  }
}

export default new BoardModel();
