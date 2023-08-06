import { StatisticModel, MBTIModel } from '../db/models/index.js';

class StatisticService {
  constructor(statisticModel, mbtiModel) {
    this.statisticModel = statisticModel;
    this.mbtiModel = mbtiModel;
  }
  async getStatistic(parent, mbtiType) {
    return await this.statisticModel.findMBTI(parent, mbtiType);
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
  async updateStatistic(statisticInfo) {
    return await this.statisticModel.update(statisticInfo);
  }

}

export default new StatisticService(StatisticModel, MBTIModel);
