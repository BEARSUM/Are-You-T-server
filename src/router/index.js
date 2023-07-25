import { Router } from 'express';
import boardRouter from './boardRouter.js';
import testRouter from './testRouter.js';
import questionRouter from './questionRouter.js';
// const { isAdmin, isAuthenticated } = require('../middlewares');

// 버전1 라우터
const v1Router = Router();

v1Router.use('/board', boardRouter);
v1Router.use('/test', testRouter);
v1Router.use('/question', questionRouter);

export const v1 = v1Router;
