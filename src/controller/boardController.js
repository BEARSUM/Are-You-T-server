import { boardService } from '../services/index.js';
import { buildResponse } from '../misc/utils.js';
import { asyncHandler } from '../middlewares/index.js';

export class boardController {
  getBoard = asyncHandler(async (req, res, next) => {
    res.json(buildResponse({ msg: '겟' }));
  });
  postBoard = async (req, res, next) => {
    const { uuid, category, content, like, dislike } = req.body;
    await boardService.postBoard({ uuid, category, content, like, dislike });
    res.json(buildResponse({ msg: '등록 완료' }));
  };
}
