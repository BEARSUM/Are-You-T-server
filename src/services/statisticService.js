import { StatisticModel } from '../db/models/index.js';

class StatisticService {
  constructor(statisticModel) {
    this.statisticModel = statisticModel;
  }
  async getStatistic(parent, mbtiType) {
    return await this.statisticModel.find(parent, mbtiType);
  }
  async addStatistic(statistic) {
    return await this.statisticModel.create(statistic);
  }
  async updateStatistic(statisticInfo) {
    return await this.statisticModel.update(statisticInfo);
  }
}

export default new StatisticService(StatisticModel);
