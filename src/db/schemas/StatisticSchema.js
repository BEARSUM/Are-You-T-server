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
  // 해당 mbti가 어떤 문항에 어떤 응답을 했는지에 대한 비율
  // 해당 스키마에 해당되는 요소는 테스트가 완료될 때마다 업데이트 되어야 한다.
  // 1번 -> E, 2번 -> I, 3번 -> I, 4번 -> I
  // ... 15번 -> J, 16번 -> P
  // 해당 배열에는 총 32개(문항수 * 응답가능답변 수)의 객체가 들어갈 것이며
  // 구조는 다음과 같다.
  // {
  //   idx : 15 (문항 번호)
  //   response : J
  //   count : 33 (특정 mbti 유형이 해당 응답을 선택한 갯수)
  // }
  mbtiResponse: {
    type: Array,
    required: true,
  },
  // mbti에 대한 비율
  // E가 0.3이면 I는 0.7, S가 0.93이면 N은 0.07 이런식으로 데이터가 들어갈 것이다.
  mbtiRatio: {
    E: {
      type: Number,
      required: true,
    },
    I: {
      type: Number,
      required: true,
    },
    S: {
      type: Number,
      required: true,
    },
    N: {
      type: Number,
      required: true,
    },
    T: {
      type: Number,
      required: true,
    },
    F: {
      type: Number,
      required: true,
    },
    J: {
      type: Number,
      required: true,
    },
    P: {
      type: Number,
      required: true,
    },
  },
});
