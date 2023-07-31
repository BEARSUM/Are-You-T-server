import { Schema } from 'mongoose';

export default new Schema({
  // 특정 mbti 유형
  mbtiType: {
    type: String,
    required: true,
  },
  // 테스트 제목
  parent: {
    type: String,
    required: true,
    // TestSchema 참조. 테스트가 어떤 테스트인지를 판별하는 요소
  },
  totalResponse: {
    type: Number,
    required: true,
    default: 0,
  },
  mbtiData: [
    {
      idx: {
        type: Number,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      answer: {
        E: { type: String, default: '', required: false },
        I: { type: String, default: '', required: false },
        N: { type: String, default: '', required: false },
        S: { type: String, default: '', required: false },
        T: { type: String, default: '', required: false },
        F: { type: String, default: '', required: false },
        J: { type: String, default: '', required: false },
        P: { type: String, default: '', required: false },
      },
      selection: {
        E: { type: Number, default: 0, required: false },
        I: { type: Number, default: 0, required: false },
        N: { type: Number, default: 0, required: false },
        S: { type: Number, default: 0, required: false },
        T: { type: Number, default: 0, required: false },
        F: { type: Number, default: 0, required: false },
        J: { type: Number, default: 0, required: false },
        P: { type: Number, default: 0, required: false },
      },
    },
  ],
});
