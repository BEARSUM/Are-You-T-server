import { Router } from 'express';
import { TestService } from '../services/index.js';
import { buildResponse } from '../misc/utils.js';
import { asyncHandler } from '../middlewares/index.js';

const testRouter = Router();

// MBTI 테스트 목록 조회
testRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const tests = await TestService.getTests();
    res.json(buildResponse(tests));
  })
);

// MBTI 테스트명 저장
testRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { name } = req.body;
    const test = await TestService.addTest({ name });
    res.json(buildResponse(test));
  })
);

// MBTI 테스트명 수정
testRouter.patch(
  '/',
  asyncHandler(async (req, res, next) => {
    const { id, name } = req.body;
    const test = await TestService.updateTest({ id, name });
    res.json(buildResponse(test));
  })
);

// MBTI 테스트명 삭제
testRouter.delete(
  '/',
  asyncHandler(async (req, res, next) => {
    const { id } = req.body;
    const test = await TestService.deleteTest({ id });
    res.json(buildResponse(test));
  })
);

export default testRouter;
