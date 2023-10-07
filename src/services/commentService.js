import { CommentModel } from '../db/models/index.js';
import bcrypt from 'bcrypt';
import { hashPassword } from '../misc/utils.js';
import AppError from '../misc/AppError.js';

class CommentService {
  constructor(commentModel) {
    this.commentModel = commentModel;
  }
  async getComments(boardId) {
    return await this.commentModel.findByBoardId(boardId);
  }
  async addComment(comment) {
    const { boardId, depthCommentId, password, content, color } = comment;
    // depth 결정
    if (depthCommentId) {
      // TODO: commentId가 존재할 경우 부모 댓글이 있다는 뜻이므로 조회해서 depth를 결정해야 한다.
    }
    const depth = 0;

    const hashedPassword = await hashPassword(password);
    return await this.commentModel.create({ boardId, depthCommentId, depth, hashedPassword, content, color });
  }
  async checkCommentInfo(id, pw) {
    const comment = await this.commentModel.findByIdWithPw(id);
    const isPasswordCorrect = bcrypt.compareSync(pw, comment.password);
    if (!isPasswordCorrect) {
      throw new AppError('Bad Request', 400, 'PW를 확인해 주세요.');
    }
    comment.password = pw;
    return comment;
  }
  async updateComment(id, comment) {
    const { password, content, color } = comment;
    const hashedPassword = await hashPassword(password);
    return await this.commentModel.update(id, { hashedPassword, content, color });
  }
  async updateCommentLikes(id) {
    return await this.commentModel.updateLike(id);
  }
  async deleteComment(id) {
    return await this.commentModel.delete(id);
  }
}

export default new CommentService(CommentModel);
