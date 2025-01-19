import {
  CTAPosition,
  LFFillButton,
  GlobalContainer,
  LFHeader,
  LFHeaderGoBack,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import { TopQuestion } from "@/screen/login/onboarding/_component/shared/TopQuestion.tsx";
import { MainContentContainer } from "@/screen/login/onboarding/_component/shared/Layout.tsx";

export const BirthOfYear = () => {
  useDisableScroll();
  const { onMoveNext, onMovePrev } = useOnboardingStore();

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />
      <TopQuestion
        title={"태어난 연도를 알려주세요"}
        description={"비슷한 관심사 설정을 위해 필요해요"}
      />

      <MainContentContainer></MainContentContainer>

      <CTAPosition>
        <LFFillButton type={"Green"} onClick={() => onMoveNext()}>
          만나서 반가워!
        </LFFillButton>
      </CTAPosition>
    </GlobalContainer>
  );
};
