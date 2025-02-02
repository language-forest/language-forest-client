import {
  HStack,
  LFBottomTabNavigation,
  LFHeader,
  LFHeaderClose,
  LFList,
  LFPageWrapper,
  LFText,
  VStack,
} from "@/component/design-system";
import { useUserStore } from "@/store/useUserStore.ts";
import { overlay } from "overlay-kit";
import { useAsyncEffect } from "@/hook/useAsyncEffect.ts";
import { useNotificationStore } from "@/store/useNotificationStore.ts";
import { deviceTimeFromDailyCronExpression } from "@repo/shared/util";
import { format } from "date-fns";
import { AccountManagementBottomSheet } from "@/screen/setting/_component/AccountManagementBottomSheet.tsx";
import { PushNotificationBottomSheet } from "@/screen/setting/_component/PushNotificationBottomSheet.tsx";
import { useLFNavigate } from "@/util/navigate/useLFNavigate.ts";
import packageJson from "../../../package.json";

const SettingScreen = () => {
  const logout = useUserStore((state) => state.logout);
  const { push, reload } = useLFNavigate();

  const userSocialInfo = useUserStore((store) => store.userSocialInfo);
  const getUserSocialInfo = useUserStore((store) => store.getUserSocialInfo);
  const dailyStudyPushNotification = useNotificationStore(
    (store) => store.dailyStudyPushNotification,
  );
  const getDailyStudyPushNotification = useNotificationStore(
    (store) => store.getDailyStudyPushNotification,
  );

  const appleEMail = userSocialInfo?.apple
    ? `애플로그인 (${userSocialInfo.apple.email})`
    : "";
  const googleEMail = userSocialInfo?.google
    ? `구글로그인 (${userSocialInfo.google.email})`
    : "";

  const dailyStudyPushTime = (() => {
    if (!dailyStudyPushNotification) {
      return "";
    }

    if (!dailyStudyPushNotification.isActive) {
      return "알림이 꺼져있어요";
    }

    const { second, minute, hour } = deviceTimeFromDailyCronExpression(
      dailyStudyPushNotification.cron,
    );

    const localDate = new Date();
    localDate.setHours(hour, minute, second, 0);

    // 디바이스 시간 변환 후 AM/PM 형식으로 포맷팅
    return `매일 ${format(localDate, "a hh:mm")}`; // 예: "02
  })();

  const handlePushTimeBottomSheetClick = () => {
    if (!dailyStudyPushNotification) {
      return;
    }
    overlay.open(({ isOpen, close }) => {
      return (
        <PushNotificationBottomSheet
          isOpen={isOpen}
          close={close}
          dailyStudyPushNotification={dailyStudyPushNotification}
        />
      );
    });
  };

  const handleAccountBottomSheetClick = (socialLoginText: string) => {
    const handleLogout = () => {
      logout();
      push({ path: "home" });
      reload();
    };

    overlay.open(({ isOpen, close }) => {
      return (
        <AccountManagementBottomSheet
          isOpen={isOpen}
          close={close}
          socialLoginText={socialLoginText}
          onLogout={handleLogout}
        />
      );
    });
  };

  useAsyncEffect(async () => {
    await Promise.all([getUserSocialInfo(), getDailyStudyPushNotification()]);
  }, []);

  return (
    <LFPageWrapper>
      <LFHeader
        left={
          <HStack paddingHorizontal={20}>
            <LFText variant={"title2"} weight={"B"} color={"ContentMainC"}>
              설정
            </LFText>
          </HStack>
        }
        right={<LFHeaderClose />}
      />

      <VStack paddingHorizontal={20} gap={16}>
        <LFList
          list={[
            ...(appleEMail
              ? [
                  {
                    title: "계정",
                    description: appleEMail,
                    onClick: () => handleAccountBottomSheetClick(appleEMail),
                  },
                ]
              : []),

            ...(googleEMail
              ? [
                  {
                    title: "계정",
                    description: googleEMail,
                    onClick: () => handleAccountBottomSheetClick(googleEMail),
                  },
                ]
              : []),
          ]}
        />

        {dailyStudyPushTime && (
          <LFList
            list={[
              {
                title: "학습 알림 설정",
                description: dailyStudyPushTime,
                onClick: () => handlePushTimeBottomSheetClick(),
              },
            ]}
          />
        )}

        <LFList
          list={[
            {
              prefixIcon: { variant: "Question", size: 32 },
              title: "자주 묻는 질문",
              onClick: () => console.log("ccc"),
            },
            {
              title: "버전",
              description: `버전: ${packageJson.version}`,
              onClick: () => {},
            },
          ]}
        />
      </VStack>

      <LFBottomTabNavigation />
    </LFPageWrapper>
  );
};

export default SettingScreen;
