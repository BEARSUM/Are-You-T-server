import { Router } from 'express';
import { QuestionService } from '../services/index.js';
import { buildResponse } from '../misc/utils.js';
import { asyncHandler } from '../middlewares/index.js';

const questionRouter = Router();

// MBTI 테스트 문항 조회
questionRouter.get(
  '/:parent',
  asyncHandler(async (req, res, next) => {
    const { parent } = req.params;
    const questions = await QuestionService.getQuestions(parent);
    res.json(buildResponse(questions));
  })
);

// MBTI 테스트 문항 저장
questionRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { idx, subject, parent, answer, mbtiType, typeAnswer, proportion } = req.body;
    const question = await QuestionService.addQuestion({
      idx,
      subject,
      parent,
      answer,
      mbtiType,
      proportion,
    });
    res.json(buildResponse(question));
  })
);

// MBTI 테스트 문항 수정
questionRouter.put(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { subject, parent, answer, mbtiType, typeAnswer, proportion } = req.body;
    const question = await QuestionService.updateQuestion({
      id,
      subject,
      parent,
      answer,
      mbtiType,
      proportion,
    });
    res.json(buildResponse(question));
  })
);

// MBTI 테스트 문항 삭제
questionRouter.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const question = await QuestionService.deleteQuestion(id);
    res.json(buildResponse(question));
  })
);

export default questionRouter;
