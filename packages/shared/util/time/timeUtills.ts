import { isAfter, isBefore, isEqual } from "date-fns";

/**
 * 시간 비교를 위한 인터페이스
 */
export interface TimeComparisonParams {
  baseTime: Date; // 기준이 되는 시간
  targetTime: Date; // 비교 대상 시간
}

/**
 * 특정 시간이 목표 시간보다 큰지, 작거나 같은지 확인하는 함수
 */
export const compareTime = (params: TimeComparisonParams) => {
  const { baseTime, targetTime } = params;

  return {
    isGreater: isAfter(baseTime, targetTime), // baseTime > targetTime
    isGreaterOrEqual:
      isAfter(baseTime, targetTime) || isEqual(baseTime, targetTime), // baseTime >= targetTime
    isLess: isBefore(baseTime, targetTime), // baseTime < targetTime
    isLessOrEqual:
      isBefore(baseTime, targetTime) || isEqual(baseTime, targetTime), // baseTime <= targetTime
  };
};
