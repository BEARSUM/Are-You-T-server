import { model } from 'mongoose';
import { BoardSchema } from '../schemas/index.js';

const Board = model('boards', BoardSchema);

class BoardModel {
  async find() {
    return await Board.find().sort({ createdAt: -1 }).lean();
  }
  async findMBTI(category) {
    return await Board.find({ category }).sort({ createdAt: -1 }).lean();
  }
  async findById(id) {
    return await Board.findById(id).lean();
  }
  async create(board) {
    return (await Board.create(board)).toObject();
  }
  async update(id, board) {
    const { category, title, content, color } = board;
    return await Board.findByIdAndUpdate(id, { category, title, content, color }, { new: true }).lean();
  }
  async updateLike(id) {
    return (await Board.findByIdAndUpdate(id, { $inc: { like: 1 } }, { new: true })).toObject();
  }
  async delete(id) {
    return (await Board.findByIdAndDelete(id)).toObject();
  }
}

export default new BoardModel();
