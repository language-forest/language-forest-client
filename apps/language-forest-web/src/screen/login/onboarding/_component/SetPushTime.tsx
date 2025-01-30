import {
  LFFillButton,
  LFPageWrapper,
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
import {
  dailyCronExpressionFromDeviceTime,
  PeriodListType,
} from "@repo/shared/util";
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
    const cron = dailyCronExpressionFromDeviceTime({
      period,
      hour,
      minute,
    });
    updateUserNotification({
      cron,
      notificationPreference: "DAILY_STUDY",
    });
    onMoveNext();
  };

  return (
    <LFPageWrapper>
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
    </LFPageWrapper>
  );
};

const periodList: PeriodListType[] = ["AM", "PM"];

const hourList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const minuteList = [0, 15, 30, 45];
