import { Router } from 'express';
import { StatisticService } from '../services/index.js';
import { buildResponse } from '../misc/utils.js';
import { asyncHandler } from '../middlewares/index.js';

const statisticRouter = Router();

// mbti별 통계 조회
statisticRouter.get(
  '/:parent/:mbti',
  asyncHandler(async (req, res, next) => {
    const { parent, mbti } = req.params;
    const statistics = await StatisticService.getStatistic(parent, mbti);
    res.json(buildResponse(statistics));
  })
);

// mbti 결과 저장 (테스트 결과 정보로 처리)
statisticRouter.put(
  '/',
  asyncHandler(async (req, res, next) => {
    const { parent, mbtiType, mbtiData } = req.body;
    // 없으면 추가, 있으면 수정
    const test = await StatisticService.updateStatistic({ parent, mbtiType, mbtiData });
    res.json(buildResponse(test));
  })
);

export default statisticRouter;
