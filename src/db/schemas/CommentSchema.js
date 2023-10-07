import { Schema } from 'mongoose';

const CommentSchema = new Schema(
  {
    // 사용자 uuid (일단 보류.)
    uuid: {
      type: String,
      required: false,
    },
    // 게시글 Id
    boardId: {
      type: Schema.Types.ObjectId,
      ref: 'Board',
      required: true,
    },
    depthCommentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
    },
    // 댓글 깊이
    depth: {
      type: Number,
      required: true,
      default: 0,
    },
    // 댓글 비밀번호
    password: {
      type: String,
      required: true,
    },
    // 댓글 내용
    content: {
      type: String,
      required: true,
    },
    // 댓글 프로필 색상
    color: {
      type: String,
      required: true,
    },
    // 공감 (좋아요)
    like: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: 'comments',
    timestamps: true,
  }
);

export default CommentSchema;
