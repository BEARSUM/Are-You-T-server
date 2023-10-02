import { Schema } from 'mongoose';

export default new Schema(
  {
    // 사용자 uuid (일단 보류.)
    uuid: {
      type: String,
      required: false,
    },
    // mbti 카테고리 (16개의 mbti)
    category: {
      type: String,
      required: true,
    },
    // 게시글 제목
    title: {
      type: String,
      required: true,
    },
    // 게시글 내용
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    // 공감
    like: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    collection: 'boards',
    timestamps: true
  },
);
