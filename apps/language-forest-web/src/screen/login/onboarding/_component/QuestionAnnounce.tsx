import {
  CTAPosition,
  LFFillButton,
  GlobalContainer,
  LFHeader,
  LFHeaderGoBack,
  LFText,
  VStack,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";

export const QuestionAnnounce = () => {
  useDisableScroll();
  const { onMoveNext } = useOnboardingStore();

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMoveNext} />} />

      <VStack>
        <LFText
          variant={"title3"}
          color={"LFBlack"}
          weight={"B"}
          textAlign={"center"}
        >
          안녕하세요!
        </LFText>
        <LFText
          variant={"title3"}
          color={"LFBlack"}
          weight={"B"}
          textAlign={"center"}
        >
          저는 '수푸리'라고 해요
        </LFText>
      </VStack>

      <CTAPosition>
        <LFFillButton type={"Green"} onClick={() => onMoveNext()}>
          만나서 반가워!
        </LFFillButton>
      </CTAPosition>
    </GlobalContainer>
  );
};
