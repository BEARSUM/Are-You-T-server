import { QuestionModel } from '../db/models/index.js';
// import { hashPassword, randomPassword } from '../misc/utils';
// import AppError from '../misc/AppError';

class QuestionService {
  constructor(questionModel) {
    this.questionModel = questionModel;
  }
  async getQuestions(parent) {
    const questions = await this.questionModel.find(parent);
    const selectElements = 2;
    const selectedQuestions = [];

    // 빈 객체를 초기화하여 값에 따라 요소들을 그룹화합니다.
    // e, i, s, n, t, f, j, p 에 따라야 됨.
    const groupedArr = questions.reduce((groups, item) => {
      if (!groups[item.mbtiType]) {
        groups[item.mbtiType] = [];
      }
      groups[item.mbtiType].push(item);
      return groups;
    }, {});

    // 키만 추출하여 배열로 저장합니다.
    const keys = Object.keys(groupedArr);
    keys.forEach(key => {
      // 원본 배열에서 랜덤하게 섞기
      for (let i = groupedArr[key].length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = groupedArr[key][i];
        groupedArr[key][i] = groupedArr[key][j];
        groupedArr[key][j] = temp;
      }
      selectedQuestions.push(groupedArr[key].slice(0, selectElements));
    });

    const randomSeqQuestions = selectedQuestions.flat();
    for (let i = randomSeqQuestions.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = randomSeqQuestions[i];
      randomSeqQuestions[i] = randomSeqQuestions[j];
      randomSeqQuestions[j] = temp;
    }
    return randomSeqQuestions;
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
