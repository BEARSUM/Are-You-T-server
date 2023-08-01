import { model } from 'mongoose';
import { MBTISchema } from '../schemas/index.js';

const MBTI = model('mbtis', MBTISchema);

class MBTIModel {
  async findAll() {
    return await MBTI.find({}, { name: 1, count: 1 }).lean();
  }
  // 결과값이 mbti name이긴 한데, name은 고유값이 아닐 수 있다. 이렇게 써도 될까?
  async findByName(name) {
    return await MBTI.findOne({ name }).lean();
  }
  async create(mbti) {
    return (await MBTI.create(mbti)).toObject();
  }
  async update(mbti) {
    const { id, summary, content } = mbti;
    return (await MBTI.findByIdAndUpdate(id, { $set: { summary, content } })).toObject();
  }
  // mbti 결과가 나오면 해당 mbti에 대해 count를 1 증가시켜준다
  // 전체통계 조회용
  async updateByMbti(name) {
    return await MBTI.findOneAndUpdate({name}, { $inc: {count : 1}});
  }
  async delete(id) {
    return await MBTI.findByIdAndDelete(id);
  }
}

export default new MBTIModel();
