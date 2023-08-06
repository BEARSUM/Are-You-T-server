import { QuestionModel } from '../db/models/index.js';
// import { hashPassword, randomPassword } from '../misc/utils';
// import AppError from '../misc/AppError';

class QuestionService {
  constructor(questionModel) {
    this.questionModel = questionModel;
  }
  async getQuestions(parent) {
    return await this.questionModel.find(parent);
  }
  async addQuestion(question) {
    return await this.questionModel.create(question);
  }
  async updateQuestion(questionInfo) {
    return await this.questionModel.update(questionInfo);
  }
  async deleteQuestion(id) {
    return await this.questionModel.delete(id);
  }
}

export default new QuestionService(QuestionModel);
