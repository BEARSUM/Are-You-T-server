import { model } from 'mongoose';
import { TestSchema } from '../schemas/index.js';

const Test = model('tests', TestSchema);

class TestModel {
  // MBTI 테스트 목록 조회
  async find() {
    return await Test.find().lean();
  }
  // MBTI 테스트명 저장
  async create(test) {
    return (await Test.create(test)).toObject();
  }
  // MBTI 테스트명 수정
  async update(testInfo) {
    const { id, name } = testInfo;
    return await Test.findByIdAndUpdate(id, { $set: { name } });
  }
  // MBTI 테스트명 삭제
  async delete(idInfo) {
    const { id } = idInfo;
    return await Test.findByIdAndDelete(id);
  }
}

export default new TestModel();
