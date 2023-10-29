import { StatisticModel, MBTIModel } from '../db/models/index.js';

class StatisticService {
  constructor(statisticModel, mbtiModel) {
    this.statisticModel = statisticModel;
    this.mbtiModel = mbtiModel;
  }
  async imsiUpdate(mbti) {
    return await this.statisticModel.imsiUpdate(mbti);
  }
  async getMbtiStatistic(parent, mbtiType) {
    return await this.statisticModel.findMbtiStat(parent, mbtiType);
  }
  async getStatistic(parent, mbtiType, answerMbtiType) {
    const stats = await this.statisticModel.findMbtiStat(parent, mbtiType);
    const newData = {
      _id: stats._id,
      mbtiType: stats.mbtiType,
      parent: stats.parent,
      totalResponse: stats.totalResponse,
      mbtiData: stats.mbtiData.filter((stat) => stat.answerMbtiType === answerMbtiType),
    };
    return newData;
  }
  // mbti 인원 통계 (16개유형))
  async getAllStatistic() {
    return await this.mbtiModel.findAll();
  }

  async updateMbti(name) {
    return await this.mbtiModel.updateByMbti(name);
  }
  async addStatistic(statistic) {
    return await this.statisticModel.create(statistic);
  }
  async addNewStatistic(statistic) {
    return await this.statisticModel.createNew(statistic);
  }
  async updateStatistic(statisticInfo) {
    return await this.statisticModel.update(statisticInfo);
  }
}

export default new StatisticService(StatisticModel, MBTIModel);
