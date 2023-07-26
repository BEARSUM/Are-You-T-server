import { Schema } from 'mongoose';

// 어떤 테스트에 대한 문항인지. 사실 테스트는 1개만 만들 것이지만,
// 나중에 확장성을 위해 이렇게 정의한다.
export default new Schema({
  // 문항 번호
  idx: {
    type: Number,
    required: true,
  },
  // 문항 질문(주제)
  subject: {
    type: String,
    required: true,
  },
  // 테스트 제목
  parent: {
    type: String,
    required: true,
    // TestSchema 참조. 테스트가 어떤 테스트인지를 판별하는 요소
  },
  answer: {
    type: Array,
    required: true,
  },
  // 어떤 mbti 판별에 대한 문항인지의 타입
  // E, I, N, S, F, T, P, J
  mbtiType: {
    type: String,
    required: true,
  },
  // mbtiType에 대한 답변
  typeAnswer: {
    type: String,
    required: true,
  },
  // 중요도
  proportion: {
    type: Number,
    required: true,
  },
});
