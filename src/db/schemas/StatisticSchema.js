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
    default: 1,
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
        E: { type: String, required: false },
        I: { type: String, required: false },
        N: { type: String, required: false },
        S: { type: String, required: false },
        T: { type: String, required: false },
        F: { type: String, required: false },
        J: { type: String, required: false },
        P: { type: String, required: false },
      },
      selection: {
        E: { type: Number, required: false },
        I: { type: Number, required: false },
        N: { type: Number, required: false },
        S: { type: Number, required: false },
        T: { type: Number, required: false },
        F: { type: Number, required: false },
        J: { type: Number, required: false },
        P: { type: Number, required: false },
      },
    },
  ],
});
