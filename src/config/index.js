// node js 프로세스를 실행하는 데에 있어 필요한 설정 변수들을 하나의 객체로 모아준다.

import { config } from 'dotenv';
process.env.NODE_ENV = process.env.NODE_ENV ?? 'development';
console.log(`어플리케이션 서버를 다음 환경으로 시작합니다: ${process.env.NODE_ENV}`);

// 환경 변수 Read
const envFound = config();
// .env 파일이 없을 경우 에러 발생
if (!envFound) {
  // throw new AppError
}
// mongoDB URI 값 체크. 없을 경우 에러 발생
if (envFound.MONGODB_URI === undefined) {
  // throw new AppError
}

export const applicationName = process.env.APPLICATION_NAME ?? 'app';
export const port = parseInt(process.env.PORT ?? '3000', 10);
export const mongoDBUri = process.env.MONGODB_URI;
export const location = process.env.LOCATION;
