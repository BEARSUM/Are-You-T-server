import { Router } from 'express';
// import { boardController } from '../controller/index.js';
import { BoardService } from '../services/index.js';
import { buildResponse } from '../misc/utils.js';
import { asyncHandler } from '../middlewares/index.js';

const boardRouter = Router();

// 게시글 조회 (전체, mbti별)
boardRouter.get(
  '/:mbti?',
  asyncHandler(async (req, res, next) => {
    const category = req.params.mbti;
    const boards = category ? await BoardService.getBoardsByMbti(category) : await BoardService.getAllBoards();
    res.json(buildResponse(boards));
  })
);

// 게시글 작성
boardRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { category, content, like, dislike } = req.body;
    const result = await BoardService.postBoard({ category, content, like, dislike });
    res.json(buildResponse({ msg: '등록 완료' }));
  })
);

export default boardRouter;
