import {
  CTAPosition,
  LFFillButton,
  GlobalContainer,
  LFHeader,
  LFHeaderGoBack,
  LFText,
  LFIcon,
} from "@/component/design-system";
import { useOnboardingStore } from "./useOnboardingStore";
import { useDisableScroll } from "@/hook/useScrollDisable.ts";
import {
  MainContentContainer,
  TextContainer,
} from "@/screen/login/onboarding/_component/shared/Layout.tsx";

export const Intro = () => {
  useDisableScroll();
  const { onMoveNext } = useOnboardingStore();

  return (
    <GlobalContainer>
      <LFHeader left={<LFHeaderGoBack />} />

      <MainContentContainer>
        <TextContainer>
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
        </TextContainer>
        <LFIcon variant={"SooPooRy"} size={140} />
      </MainContentContainer>

      <CTAPosition>
        <LFFillButton type={"Green"} onClick={() => onMoveNext()}>
          만나서 반가워!
        </LFFillButton>
      </CTAPosition>
    </GlobalContainer>
  );
};
