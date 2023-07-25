import { TestModel } from '../db/models/index.js';

class TestService {
  constructor(testModel) {
    this.testModel = testModel;
  }
  async getTests() {
    return await this.testModel.find();
  }
  async addTest(test) {
    return await this.testModel.create(test);
  }
  async updateTest(testInfo) {
    return await this.testModel.update(testInfo);
  }
  async deleteTest(id) {
    return await this.testModel.delete(id);
  }
}

export default new TestService(TestModel);
