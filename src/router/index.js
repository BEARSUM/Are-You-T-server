import { Router } from 'express';
import boardRouter from './boardRouter.js';
// const { isAdmin, isAuthenticated } = require('../middlewares');

// 버전1 라우터
const v1Router = Router();

v1Router.use('/board', boardRouter);

export const v1 = v1Router;
