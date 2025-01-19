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

export const Gender = () => {
  useDisableScroll();
  const { onMoveNext, onMovePrev } = useOnboardingStore();

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />
      <TopQuestion
        title={"성별을 알려주세요"}
        description={"님을 언급할 대명사를 정하기 위해 필요해요"}
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
