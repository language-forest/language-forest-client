import { useOnboardingStore } from "@/screen/login/onboarding/_component/useOnboardingStore.tsx";
import {
  CTAPosition,
  LFFillButton,
  LFPageWrapper,
  LFHeader,
  LFText,
  LFIcon,
  HStack,
} from "@/component/design-system";
import { LFHeaderGoBack } from "@/component/design-system/Header/LFHeaderGoBack.tsx";
import { LFSmallButton } from "@/component/design-system/Button/LFSmallButton.tsx";
import { LanguageEnum } from "@repo/language-forest-api";
import {
  MainContentContainer,
  TextContainer,
} from "@/screen/login/onboarding/_component/shared/Layout.tsx";

export const SelectLanguage = () => {
  const onMoveNext = useOnboardingStore((state) => state.onMoveNext);
  const onMovePrev = useOnboardingStore((state) => state.onMovePrev);
  const updateUserStudyInfo = useOnboardingStore(
    (state) => state.updateUserStudyInfo,
  );

  const handleLanguageClick = (language: LanguageEnum) => {
    updateUserStudyInfo({ language });
    onMoveNext();
  };

  return (
    <LFPageWrapper>
      <LFHeader left={<LFHeaderGoBack onGoBack={onMovePrev} />} />

      <MainContentContainer>
        <TextContainer>
          <LFText
            variant={"title3"}
            color={"LFBlack"}
            weight={"B"}
            textAlign={"center"}
          >
            저도 만나서 반가워요!
          </LFText>
          <LFText
            variant={"title3"}
            color={"LFBlack"}
            weight={"B"}
            textAlign={"center"}
          >
            어느 숲에 들어갈까요?
          </LFText>
        </TextContainer>

        <LFSmallButton onClick={() => console.info("cc")}>
          <HStack>
            모국어: 한국어{" "}
            <LFIcon
              color={"ContentSubC"}
              variant={"chevron.right"}
              weight={"M"}
              size={13}
            />
          </HStack>
        </LFSmallButton>
      </MainContentContainer>

      <CTAPosition>
        <LFFillButton
          type={"Green"}
          onClick={() => handleLanguageClick(LanguageEnum.EN)}
        >
          영어의 숲
        </LFFillButton>

        <LFFillButton
          type={"LightGreen"}
          onClick={() => handleLanguageClick(LanguageEnum.KO)}
        >
          한국의 숲
        </LFFillButton>
      </CTAPosition>
    </LFPageWrapper>
  );
};
