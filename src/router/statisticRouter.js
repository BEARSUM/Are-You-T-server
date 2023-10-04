import { Router } from 'express';
import { StatisticService } from '../services/index.js';
import { buildResponse } from '../misc/utils.js';
import { asyncHandler } from '../middlewares/index.js';

const statisticRouter = Router();

// 임시로 데이터 수정하려고 추가한 api
statisticRouter.put('/update/:mbti', asyncHandler(async (req, res, next) => {
  const { mbti } = req.params;
  const statistics = await StatisticService.imsiUpdate(mbti);
  res.json(buildResponse(statistics));
}))

// mbti별 통계 조회
statisticRouter.get(
  '/:parent/:mbti/:answerMbtiType',
  asyncHandler(async (req, res, next) => {
    const { parent, mbti, answerMbtiType } = req.params;
    const statistics = await StatisticService.getStatistic(parent, mbti, answerMbtiType);
    res.json(buildResponse(statistics));
  })
);

// mbti 16개 유형 전체 통계 조회
statisticRouter.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const statistics = await StatisticService.getAllStatistic();
    res.json(buildResponse(statistics));
  })
);

// 전체 수 증가
statisticRouter.patch(
  '/:mbti',
  asyncHandler(async (req, res, next) => {
    const { mbti } = req.params;
    const allStats = await StatisticService.updateMbti(mbti);
    res.json(buildResponse(allStats));
  })
);

// mbti 결과 저장 (테스트 결과 정보로 처리) - 테스트가 끝난 뒤 api를 호출한다. 그럼 데이터는 1번만 넣으면 되는거아님?
// 먼저 mbti 유형부터 저장하고, 그 뒤에 상세 정보를 저장하자
statisticRouter.put(
  '/',
  asyncHandler(async (req, res, next) => {
    const { parent, mbtiType, mbtiData } = req.body;
    let createData = [];
    let result = null;
    const stat = await StatisticService.getMbtiStatistic(parent, mbtiType);
    // 통계 자체가 아예 없을 경우 새로 생성하기 위함
    if (!stat) {
      // 객체를 복사한 뒤 "selection" 프로퍼티를 빈 객체로 초기화
      createData = mbtiData.map((item) => {
        return { ...item, selection: {} };
      });
      // 각 객체의 "answer" 프로퍼티의 키 값을 "selection" 객체에 저장
      createData.forEach((item) => {
        const { answer, selected, selection } = item;
        Object.keys(answer).forEach((key) => {
          if (!selection[key]) {
            selection[key] = 0;
          }
          if (key === selected) selection[key]++;
        });
        // selected 프로퍼티 삭제
        delete item.selected;
      });

      result = await StatisticService.addStatistic({ parent, mbtiType, mbtiData: createData });
    } else {
      // 일단 데이터가 있지만 특정 질문에 대해서는 데이터가 없을 수 있다.
      // 이 때를 대비하여 없으면 새로 추가해야 한다.
      // stat.mbtiData 배열의 객체에 idx가 없을 경우 새로 추가할것


      // 사실상 싱크 안맞을 위험이 있어서 이렇게 짜면 안됨
      // 좀 하드코딩임
      const newSelection = [];
      const selectedArr = [];
      const indexArr = []; // 전달받은 검사지의 idx를 전달받아 저장하기 위함
      mbtiData.forEach((item) => {
        selectedArr.push(item.selected);
        indexArr.push(item.idx);
      });
      // 여기서 seleciton 객체 받아서 selected 에 해당하는거 있으면 값 증가시켜주기
      stat.mbtiData.forEach(async (item, i) => {
        if(item.find(item => item.idx === indexArr[i])) {
          Object.keys(item.selection).forEach((key) => {
            if (key === selectedArr[i]) {
              item.selection[key]++;
              item.selection['idx'] = item.idx;
            }
          });
          newSelection.push(item.selection);

        } 
        else {
          // 문항 통계를 새로 추가해 주어야 한다.
          // 새로 추가할 문항 및 응답에 대해 1 추가해주기
          const newElement = mbtiData.find(item => item.idx === indexArr[i]);
          newElement.selection = {};

          const { answer, selected, selection } = newElement;
          // selection에 key를 생성해 주고, 1을 더해준다.
          Object.keys(answer).forEach((key) => {
            if (!selection[key]) {
              selection[key] = 0;
            }
            if (key === selected) selection[key]++;
          });

          // selected 프로퍼티 삭제
          delete newElement.selected;
          // 새로운 문항 추가
          await StatisticService.addNewStatistic({parent, mbtiType, newElement});
        }
      });
      result = await StatisticService.updateStatistic({ parent, mbtiType, newSelection });
    }

    res.json(buildResponse(result));
  })
);

export default statisticRouter;
