import { model } from 'mongoose';
import { CommentSchema } from '../schemas/index.js';

const Comment = model('comments', CommentSchema);

class CommentModel {
  // boardId로 해당 board의 댓글 전부 조회
  async findByBoardId(boardId) {
    return await Comment.find({ boardId }, { password: 0 }).sort({ createdAt: 1 }).lean();
  }
  //   async findById(id) {
  //     return await Comment.findById(id, { password: 0 }).lean();
  //   }
  // 댓글 단건 조회 (댓글 비밀번호 검증)
  async findByIdWithPw(id) {
    return await Comment.findById(id).lean();
  }
  // 댓글 생성
  async create(comment) {
    const { boardId, depthCommentId, depth, hashedPassword, content, color } = comment;
    return (
      await Comment.create({ boardId, depthCommentId, depth, password: hashedPassword, content, color })
    ).toObject();
  }
  // 댓글 내용 수정
  async update(id, comment) {
    const { hashedPassword, content, color } = comment;
    return await Comment.findByIdAndUpdate(id, { password: hashedPassword, content, color }, { new: true }).lean();
  }
  // 댓글 좋아요 증가
  async updateLike(id) {
    return (await Comment.findByIdAndUpdate(id, { $inc: { like: 1 } }, { new: true })).toObject();
  }
  // 댓글 삭제
  async delete(id) {
    return (await Comment.findByIdAndDelete(id)).toObject();
  }
  async deleteAll(id) {
    return await Comment.deleteMany({ boardId: id });
  }
}

export default new CommentModel();
