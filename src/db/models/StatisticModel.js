import { model } from 'mongoose';
import { StatisticSchema } from '../schemas/index.js';

const Statistic = model('statistics', StatisticSchema);

class StatisticModel {
  async findMBTI(parent, mbtiType) {
    return await Statistic.findOne({ parent, mbtiType }).lean();
  }
  async create(statistic) {
    return (await Statistic.create(statistic)).toObject()
  }
  async update(statisticInfo) {
    const { parent, mbtiType, newSelection } = statisticInfo;

    const filter = { parent, mbtiType };

    // totalResponse 먼저 업데이트
    await Statistic.updateOne({parent, mbtiType}, {$inc: {totalResponse: 1}});

    return await Statistic.bulkWrite(newSelection.map((newSel) => 
            ({
              updateOne: {
                filter,
                update: {
                  $set: { "mbtiData.$[elem].selection": {...newSel} },
                },
                arrayFilters: [{ "elem.idx": {...newSel}.idx }], // arrayFilters를 추가하여 필터링
              },
          })));
  }
}

export default new StatisticModel();
