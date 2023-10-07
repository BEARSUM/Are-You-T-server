import { Router } from 'express';
import boardRouter from './boardRouter.js';
import testRouter from './testRouter.js';
import questionRouter from './questionRouter.js';
import mbtiRouter from './mbtiRouter.js';
import statisticRouter from './statisticRouter.js';
import commentRouter from './commentRouter.js';
// const { isAdmin, isAuthenticated } = require('../middlewares');

// 버전1 라우터
const v1Router = Router();

v1Router.use('/board', boardRouter);
v1Router.use('/test', testRouter);
v1Router.use('/question', questionRouter);
v1Router.use('/mbti', mbtiRouter);
v1Router.use('/stats', statisticRouter);
v1Router.use('/comment', commentRouter);

export const v1 = v1Router;
