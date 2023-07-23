import { Router } from 'express';
// import { boardController } from '../controller/index.js';
import { BoardService } from '../services/index.js';
import { buildResponse } from '../misc/utils.js';
import { asyncHandler } from '../middlewares/index.js';

const boardRouter = Router();

boardRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    res.json(buildResponse({ msg: '겟' }));
  })
);

// 게시글 작성
boardRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { uuid, category, content, like, dislike } = req.body;
    const result = await BoardService.postBoard({ uuid, category, content, like, dislike });
    res.json(buildResponse({ msg: '등록 완료' }));
  })
);

export default boardRouter;
