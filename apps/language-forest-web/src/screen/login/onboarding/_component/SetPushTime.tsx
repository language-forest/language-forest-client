import {
  LFFillButton,
  GlobalContainer,
  LFHeader,
  LFHeaderGoBack,
  CTAPosition,
  HStack,
  LFPickerWheel,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import { TopQuestion } from "@/screen/login/onboarding/_component/shared/TopQuestion.tsx";
import { MainContentContainer } from "@/screen/login/onboarding/_component/shared/Layout.tsx";
import { dailyCronExpressionFromDeviceTime } from "@repo/shared/util";
import { useState } from "react";

export const SetPushTime = () => {
  useDisableScroll();

  const DEFAULT_PERIOD = "PM";
  const DEFAULT_HOUR = 7;
  const DEFAULT_MINUTE = 30;
  const [period, setPeriod] = useState<PeriodListType>(DEFAULT_PERIOD); // 오전/오후 상태
  const [hour, setHour] = useState(DEFAULT_HOUR); // 시간 (1-12)
  const [minute, setMinute] = useState(DEFAULT_MINUTE); // 분 (0-59)

  const { onMoveNext, onMovePrev, updateUserNotification } =
    useOnboardingStore();

  const generateCronExpression = () => {
    // 12시간제 -> 24시간제로 변환
    const adjustedHour = period === "PM" ? (hour % 12) + 12 : hour % 12;
    // dailyCronExpressionFromDeviceTime 함수 사용
    const cron = dailyCronExpressionFromDeviceTime({
      hour: adjustedHour,
      minute,
    });
    updateUserNotification({
      cron,
      notificationPreference: "DAILY_STUDY",
    });
    onMoveNext();
  };

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />
      <TopQuestion title={"앞으로 몇 시에 학습할까요?"} />

      <MainContentContainer>
        <HStack style={{ width: "100%", gap: 20 }}>
          <LFPickerWheel
            list={periodList}
            getInitialIndex={(item) => item.indexOf(DEFAULT_PERIOD)}
            getDisplayText={(item) => item}
            onSelectedChange={(item) => setPeriod(item)}
          />

          <LFPickerWheel
            list={hourList}
            getInitialIndex={(item) => item.indexOf(DEFAULT_HOUR)}
            getDisplayText={(item) => String(item)}
            onSelectedChange={(item) => setHour(item)}
          />

          <LFPickerWheel
            list={minuteList}
            getInitialIndex={(item) => item.indexOf(DEFAULT_MINUTE)}
            getDisplayText={(item) => String(item)}
            onSelectedChange={(item) => setMinute(item)}
          />
        </HStack>
      </MainContentContainer>
      <CTAPosition>
        <LFFillButton type={"Green"} onClick={generateCronExpression}>
          다음
        </LFFillButton>
      </CTAPosition>
    </GlobalContainer>
  );
};

const periodList: PeriodListType[] = ["AM", "PM"];
type PeriodListType = "AM" | "PM";

const hourList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const minuteList = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];
