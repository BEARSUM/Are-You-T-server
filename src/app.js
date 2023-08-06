import { createServer } from 'http';
import cors from 'cors';
import express, { json } from 'express';
import { connectMongoDB, disconnectMongoDB } from './loader/index.js';
import { port } from './config/index.js';
import { v1 } from './router/index.js';
import pkg from 'body-parser';

const createApp = async () => {
  await connectMongoDB();

  const app = express();
  const { json: _json } = pkg;

  // CORS 에러 방지
  // app.use(cors());
  app.use(
    cors({
      credentials: true,
      // origin: 'http://localhost:3000',
      origin: 'https://client-three-bice.vercel.app'
    })
  );

  // Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함
  app.use(json());
  app.use(_json());

  // version 1의 api router 등록
  app.use('/api/v1', v1);

  // 해당되는 URL이 없을 때를 대비한 미들웨어
  app.use((req, res, next) => {
    next();
    // new AppError()
  });

  app.use(function (err, req, res, next) {
    res.status(400).json({
      errorName: err.name,
      httpCode: err.httpCode,
      errorMessage: err.message,
    });
  });

  // 에러 핸들러 등록

  // express와 http.Server 분리
  const server = createServer(app);

  const serverApp = {
    start() {
      server.listen(port);
      server.on('listening', () => {
        console.log(`서버가 포트 ${port}에서 구동중입니다.`);
      });
    },
    // 서버 중지를 위함. ctrl + c 누른 직후 실행
    stop() {
      console.log('서버를 중지하고 있습니다.');
      this.isShuttingDown = true;
      return new Promise((resolve, reject) => {
        server.close(async (error) => {
          if (error !== undefined) {
            console.log(`HTTP 서버 중지 실패: ${error.message}`);
            reject(error);
          }
          console.log('더 이상 커넥션을 받지 않습니다.');
          await disconnectMongoDB();
          console.log('DB 커넥션을 정상적으로 끊었습니다.');
          console.log('서버 중지 작업 성공하였습니다.');
          this.isShuttingDown = false;
          resolve();
        });
      });
    },
    isShuttingDown: false, // 서버가 중지하는 상태인지를 확인하는 플래그
    _app: app,
  };

  return serverApp;
};

export { createApp };
