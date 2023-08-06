import { MBTIModel } from '../db/models/index.js';

class MBTIService {
  constructor(mbtiModel) {
    this.mbtiModel = mbtiModel;
  }
  async getAllMbtis() {
    return await this.mbtiModel.findAll();
  }
  async getMbti(name) {
    return await this.mbtiModel.findByName(name);
  }
  async addMbti(mbti) {
    return await this.mbtiModel.create(mbti);
  }
  async updateMbti(mbti) {
    return await this.mbtiModel.update(mbti);
  }
  async deleteMbti(mbti) {
    return await this.mbtiModel.delete(mbti);
  }
}

export default new MBTIService(MBTIModel);
