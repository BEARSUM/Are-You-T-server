import { Router } from 'express';
import { MBTIService } from '../services/index.js';
import { buildResponse } from '../misc/utils.js';
import { asyncHandler } from '../middlewares/index.js';

const mbtiRouter = Router();

// MBTI 결과(유형) 조회
mbtiRouter.get(
  '/:name',
  asyncHandler(async (req, res, next) => {
    const { name } = req.params;
    const mbti = await MBTIService.getMbti(name);
    res.json(buildResponse(mbti));
  })
);

// MBTI 테스트명 저장
mbtiRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { name, summary, content } = req.body;
    const mbti = await MBTIService.addMbti({ name, summary, content });
    res.json(buildResponse(mbti));
  })
);

// MBTI 테스트명 수정
mbtiRouter.put(
  '/',
  asyncHandler(async (req, res, next) => {
    const { id, summary, content } = req.body;
    const mbti = await MBTIService.updateMbti({ id, summary, content });
    res.json(buildResponse(mbti));
  })
);

// MBTI 테스트명 삭제
mbtiRouter.delete(
  '/',
  asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const mbti = await MBTIService.deleteMbti(id);
    res.json(buildResponse(mbti));
  })
);

export default mbtiRouter;
