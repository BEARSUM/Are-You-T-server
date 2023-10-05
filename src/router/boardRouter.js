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
    const boards = category ? await BoardService.getBoardsByMbti(category) : await BoardService.getBoards();
    res.json(buildResponse(boards));
  })
);

// 특정 게시글 조회
boardRouter.get(
  '/post/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const board = await BoardService.getBoard(id);
    res.json(buildResponse(board));
  })
);

// 게시글 작성
boardRouter.post(
  '/',
  asyncHandler(async (req, res, next) => {
    const { category, title, content, color } = req.body;
    const result = await BoardService.addBoard({ category, title, content, color });
    res.json(buildResponse({ msg: '등록 완료' }));
  })
);

// 게시글 수정
boardRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { category, title, content, color } = req.body;
    const result = await BoardService.updateBoard(id, { category, title, content, color });
    res.json(buildResponse({ msg: '수정 완료' }));
  })
);

// 게시글 좋아요 추가
boardRouter.patch(
  '/post/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await BoardService.updateBoardLikes(id);
    res.json(buildResponse(result));
  })
);

boardRouter.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await BoardService.deleteBoard(id);
    res.json(buildResponse(result));
  })
);

export default boardRouter;
