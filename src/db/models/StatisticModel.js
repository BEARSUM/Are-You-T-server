import { model } from 'mongoose';
import { StatisticSchema } from '../schemas/index.js';

const Statistic = model('statistics', StatisticSchema);

class StatisticModel {
  async findMBTI(parent, mbtiType) {
    return await Statistic.findOne({ parent, mbtiType }).lean();
  }
  async update(statisticInfo) {
    const { parent, mbtiType, mbtiData } = statisticInfo;
    const { idx, subject, answer } = mbtiData;

    let result;
    // 1. mbtiType에 해당하는 문서 조회
    const existingDocument = await Statistic.findOne({ parent, mbtiType });

    // 2. 존재하지 않는 경우, 새로운 문서 생성
    if (!existingDocument) {
      // 새로운 데이터 생성
      const newDocument = new Statistic({
        parent,
        mbtiType,
        totalResponse: 1,
        mbtiData: inputData.mbtiData, // 수정 필요
      });
      // 데이터 저장
      result = await newDocument.save();
    } else {
      // 3. 존재하는 경우, 데이터 수정
      const updateData = {
        $inc: { totalResponse: 1 }, // totalResponse 필드 1 증가
      };

      // selection 필드 값에 따라 해당 필드 1 증가
      for (const item of inputData.mbtiData) {
        updateData.$inc[`mbtiData.$[elem${item.selection}].selection.${item.selection}`] = 1;
      }
      // 데이터 업데이트
      result = await Statistic.findOneAndUpdate({ parent, mbtiType }, updateData, {
        arrayFilters: inputData.mbtiData.map((item) => ({ [`elem${item.selection}.idx`]: item.idx })),
      });
    }

    return result.toObject(); // (await Statistic.findByOneAndUpdate({ parent, mbtiType }, { $set: { summary, content } })).toObject();
  }
}

export default new StatisticModel();
