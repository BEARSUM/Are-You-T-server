import { model } from 'mongoose';
import { MBTISchema } from '../schemas/index.js';

const MBTI = model('mbtis', MBTISchema);

class MBTIModel {
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
  async delete(id) {
    return await MBTI.findByIdAndDelete(id);
  }
}

export default new MBTIModel();
