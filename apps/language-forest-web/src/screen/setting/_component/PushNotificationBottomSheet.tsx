import {
  BottomSheet,
  HStack,
  LFFillButton,
  LFPickerWheel,
  LFText,
  LFToggle,
  VStack,
} from "@/component/design-system";
import { useEffect, useState } from "react";
import {
  dailyCronExpressionFromDeviceTime,
  deviceTimeFromDailyCronExpression,
  PeriodListType,
} from "@repo/shared/util";
import { BaseUserNotification } from "@repo/language-forest-api";
import { useNotificationStore } from "@/store/useNotificationStore.ts";

type Props = {
  isOpen: boolean;
  close: () => void;
  dailyStudyPushNotification: BaseUserNotification;
};

export const PushNotificationBottomSheet = ({
  isOpen,
  close,
  dailyStudyPushNotification,
}: Props) => {
  const updateDailyStudyPushNotification = useNotificationStore(
    (state) => state.updateDailPushNotification,
  );
  const [period, setPeriod] = useState<PeriodListType | undefined>(); // 오전/오후 상태
  const [hour, setHour] = useState<number | undefined>(); // 시간 (1-12)
  const [minute, setMinute] = useState<number | undefined>(); // 분 (0-59)
  const [isDailyPushActive, setIsDailyPushActive] = useState<boolean>(
    dailyStudyPushNotification.isActive,
  );

  const handlePushUpdate = async () => {
    if (!(period && hour && minute)) {
      return;
    }

    const { cron, isActive } = dailyStudyPushNotification;

    const updatedCron = dailyCronExpressionFromDeviceTime({
      period,
      hour,
      minute,
    });

    if (cron === updatedCron && isDailyPushActive === isActive) {
      close();
      return;
    }
    await updateDailyStudyPushNotification({
      isActive: isDailyPushActive,
      cron: updatedCron,
    });
    close();
  };

  useEffect(() => {
    const { hour: _hour, minute } = deviceTimeFromDailyCronExpression(
      dailyStudyPushNotification.cron,
    );

    const hour = _hour > 12 ? _hour - 12 : _hour;
    const period = _hour > 12 ? "PM" : "AM";

    setPeriod(period);
    setMinute(minute);
    setHour(hour);
  }, [dailyStudyPushNotification]);

  if (!(period && hour && minute)) {
    return null;
  }

  return (
    <BottomSheet
      isOpen={isOpen}
      title={"학습 알림 설정"}
      onClose={() => {
        close();
      }}
    >
      {isDailyPushActive && (
        <HStack
          width={"100%"}
          gap={20}
          paddingHorizontal={20}
          paddingVertical={20}
        >
          <LFPickerWheel
            list={periodList}
            getInitialIndex={(item) => item.indexOf(period)}
            getDisplayText={(item) => item}
            onSelectedChange={(item) => setPeriod(item)}
          />

          <LFPickerWheel
            list={hourList}
            getInitialIndex={(item) => item.indexOf(hour)}
            getDisplayText={(item) => String(item)}
            onSelectedChange={(item) => setHour(item)}
          />

          <LFPickerWheel
            list={minuteList}
            getInitialIndex={(item) => item.indexOf(minute)}
            getDisplayText={(item) => String(item)}
            onSelectedChange={(item) => setMinute(item)}
          />
        </HStack>
      )}

      <HStack
        justifyContent={"space-between"}
        paddingHorizontal={20}
        paddingVertical={20}
      >
        <LFText variant={"headline"} color={"ContentMainC"} weight={"M"}>
          데일리 알림
        </LFText>

        <LFToggle
          value={isDailyPushActive}
          onChange={(value) => setIsDailyPushActive(value)}
        />
      </HStack>

      <VStack paddingVertical={20}>
        <LFFillButton type={"Green"} onClick={handlePushUpdate}>
          확인
        </LFFillButton>
      </VStack>
    </BottomSheet>
  );
};

const periodList: PeriodListType[] = ["AM", "PM"];

const hourList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const minuteList = [0, 15, 30, 45];
