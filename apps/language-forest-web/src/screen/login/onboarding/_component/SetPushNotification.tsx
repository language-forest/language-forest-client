import { useOnboardingStore } from "@/screen/login/onboarding/_component/useOnboardingStore.tsx";
import {
  CTAPosition,
  LFFillButton,
  GlobalContainer,
  LFHeader,
} from "@/component/design-system";
import { LFHeaderGoBack } from "@/component/design-system/Header/LFHeaderGoBack.tsx";
import {
  MainContentContainer,
  TextContainer,
} from "@/screen/login/onboarding/_component/shared/Layout.tsx";
import { TopQuestion } from "@/screen/login/onboarding/_component/shared/TopQuestion.tsx";

export const SetPushNotification = () => {
  const onMoveNext = useOnboardingStore((state) => state.onMoveNext);
  const onMovePrev = useOnboardingStore((state) => state.onMovePrev);

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />
      <TopQuestion
        title={
          "학습하기 좋은 시간이네요! 약속한 시간에 알림을 드릴게요. 알림 권한을 허용해주세요."
        }
      />

      <MainContentContainer>
        <TextContainer>{/*  */}</TextContainer>
      </MainContentContainer>

      <CTAPosition>
        <LFFillButton type={"Green"} onClick={() => onMoveNext()}>
          다음ㅓㅏ
        </LFFillButton>
      </CTAPosition>
    </GlobalContainer>
  );
};
