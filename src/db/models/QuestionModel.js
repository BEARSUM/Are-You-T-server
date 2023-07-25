import { model } from 'mongoose';
import { QuestionSchema } from '../schemas/index.js';

const Question = model('questions', QuestionSchema);

class QuestionModel {
  // MBTI 테스트 명에 대한 문항 전체 조회
  async find(parent) {
    return await Question.find({ parent }).lean();
  }
  // MBTI 테스트 문항 저장
  async create(question) {
    return (await Question.create(question)).toObject();
  }
  // MBTI 테스트 문항 수정
  async update(questionInfo) {
    const { id, subject, parent, answer, mbtiType, proportion } = questionInfo;
    return await Question.findByIdAndUpdate(id, { $set: { subject, parent, answer, mbtiType, proportion } });
  }
  // MBTI 테스트 문항 삭제
  async delete(id) {
    return await Question.findByIdAndDelete(id);
  }
}

export default new QuestionModel();
