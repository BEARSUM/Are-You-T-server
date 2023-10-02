import { model } from 'mongoose';
import { StatisticSchema } from '../schemas/index.js';

const Statistic = model('statistics', StatisticSchema);

class StatisticModel {
  // 기존에 없었던 answerMbtiType을 추가하는 메서드. 사용하지 않는다.
  async imsiUpdate(mbti) {
    await Statistic.updateMany(
      { 
        mbtiType: mbti,
        "mbtiData.idx": { $in: [1, 2, 3, 4] } // 1~4 범위
      },
      { $set: { "mbtiData.$[elem].answerMbtiType": "energy" } },
      { arrayFilters: [ { "elem.idx": { $in: [1, 2, 3, 4] } } ] }
    );
    
    await Statistic.updateMany(
      { 
        mbtiType: mbti,
        "mbtiData.idx": { $in: [5, 6, 7, 8] } // 5~8 범위
      },
      { $set: { "mbtiData.$[elem].answerMbtiType": "awareness" } },
      { arrayFilters: [ { "elem.idx": { $in: [5, 6, 7, 8] } } ] }
    );

    await Statistic.updateMany(
      { 
        mbtiType: mbti,
        "mbtiData.idx": { $in: [9, 10, 11, 12] } // 9~12
      },
      { $set: { "mbtiData.$[elem].answerMbtiType": "judgement" } },
      { arrayFilters: [ { "elem.idx": { $in: [9, 10, 11, 12] } } ] }
    );

    await Statistic.updateMany(
      { 
        mbtiType: mbti,
        "mbtiData.idx": { $in: [13, 14, 15, 16] } // 13~16
      },
      { $set: { "mbtiData.$[elem].answerMbtiType": "life" } },
      { arrayFilters: [ { "elem.idx": { $in: [13, 14, 15, 16] } } ] }
    );
  }
  async findMBTI(parent, mbtiType, answerMbtiType) {
    
    // 집계함수 aggregate를 사용하여 특정 answerMbtiType에 대한 데이터만 불러온다.

    return await Statistic.aggregate([
      {
        $match: {
          parent: parent,
          mbtiType: mbtiType
        }
      },
      {
        $unwind: "$mbtiData"
      },
      {
        $match: {
          "mbtiData.answerMbtiType": answerMbtiType
        }
      }
    ]);
    // return await Statistic.findOne({ parent, mbtiType }).lean();
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
