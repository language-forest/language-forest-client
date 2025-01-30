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

export type PeriodListType = "AM" | "PM";
export const dailyCronExpressionFromDeviceTime = (time: {
  period: PeriodListType;
  hour: number;
  minute: number;
  second?: number;
}): string => {
  // 디바이스 시간 기준으로 UTC 시간 계산
  const { hour, period, minute, second = 0 } = time;
  const adjustedHour = period === "PM" ? (hour % 12) + 12 : hour % 12;

  const deviceDate = new Date();
  deviceDate.setHours(adjustedHour, minute, second, 0); // 디바이스 시간으로 설정
  const utcHour = deviceDate.getUTCHours();
  const utcMinute = deviceDate.getUTCMinutes();
  const utcSecond = deviceDate.getUTCSeconds();

  // 크론 표현식 반환 (매일 기준)
  return `${utcSecond} ${utcMinute} ${utcHour} * * *`;
};

export const deviceTimeFromDailyCronExpression = (
  cron: string,
): { hour: number; minute: number; second: number } => {
  const [second, minute, hour] = cron.split(" ").map(Number);

  const utcDate = new Date();
  utcDate.setUTCHours(hour, minute, second, 0); // UTC 기준으로 설정

  return {
    hour: utcDate.getHours(),
    minute: utcDate.getMinutes(),
    second: utcDate.getSeconds(),
  };
};
