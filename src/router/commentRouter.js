import { Router } from 'express';
import { CommentService } from '../services/index.js';
import { buildResponse } from '../misc/utils.js';
import { asyncHandler } from '../middlewares/index.js';

const commentRouter = Router();

// 댓글 조회
commentRouter.get(
  '/:boardId',
  asyncHandler(async (req, res, next) => {
    const { boardId } = req.params;
    const comments = await CommentService.getComments(boardId);
    res.json(buildResponse(comments));
  })
);

// 댓글 작성
commentRouter.post(
  '/:boardId',
  asyncHandler(async (req, res, next) => {
    const { boardId } = req.params;
    const { depthCommentId, password, content, color } = req.body;
    const result = await CommentService.addComment({ boardId, depthCommentId, password, content, color });
    res.json(buildResponse({ msg: '등록 완료' }));
  })
);

// 댓글 수정 시 비밀번호 검증
commentRouter.post(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { pw } = req.body;
    const result = await CommentService.checkCommentInfo(id, pw);
    res.json(buildResponse(result));
  })
);

// 댓글 수정
commentRouter.patch(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { password, content, color } = req.body;
    const result = await CommentService.updateComment(id, { password, content, color });
    res.json(buildResponse({ msg: '수정 완료' }));
  })
);

// 게시글 좋아요 추가
commentRouter.patch(
  '/post/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await CommentService.updateCommentLikes(id);
    res.json(buildResponse(result));
  })
);

commentRouter.delete(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const result = await CommentService.deleteComment(id);
    res.json(buildResponse(result));
  })
);

export default commentRouter;
